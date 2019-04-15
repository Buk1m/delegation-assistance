package com.idemia.ip.office.backend.delegation.assistant.files

import com.idemia.ip.office.backend.delegation.assistant.entities.File
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileService
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileSystemService
import org.apache.commons.io.FilenameUtils
import org.springframework.http.codec.multipart.FilePart
import reactor.core.publisher.Mono
import reactor.core.scheduler.Scheduler
import reactor.core.scheduler.Schedulers
import spock.lang.Specification
import spock.lang.Unroll

import java.util.concurrent.Executors
import java.util.stream.Collectors

class FileServiceSpecCase extends Specification {
    FileSystemService fileSystemService = Mock()
    FileService fileService = new FileServiceImpl(fileSystemService)

    def 'Created files have unique paths'() {
        given: 'FileParts'
            int numOfMocks = 1000
            def mockedFiles = getListOfFileParts(numOfMocks)

        when: 'Files are being created'
            List<File> files = fileService.addFiles(mockedFiles, 1, 1).collectList().block()

        then: 'All files have unique values'
            numOfMocks * fileSystemService.save(_ as FilePart, _ as String) >> Mono.just('')
            Set<String> uniquePaths = files.stream().map { f -> f.filePath }.collect(Collectors.toSet())
            files.size() == numOfMocks
            uniquePaths.size() == numOfMocks
    }

    @Unroll
    def 'Check different filenames with strange extensions or without'(String filename, String ext) {
        given: 'Files'
            FilePart file = Mock()
            file.filename() >> filename
            fileSystemService.save(_ as FilePart, _ as String) >> Mono.just('')

        expect: 'Paths are properly created for files'
            List<File> files = fileService.addFiles([file], 1, 1).collectList().block()

        and: 'File extension match original one'
            FilenameUtils.getExtension(files.get(0).filePath) == ext

        where: 'File has files'
            filename                                | ext
            ''                                      | ''
            'test'                                  | ''
            'file.with.dots'                        | 'dots'
            'file with  blank\rspaces'              | ''
            'file   with    blank spaces\rand.pdf'  | 'pdf'
            '.hiddenFile'                           | 'hiddenFile'
            'many..pdf'                             | 'pdf'
            'file   . dots and\r blank\tspaces.jpg' | 'jpg'
    }

    List<FilePart> getListOfFileParts(int n) {
        List<FilePart> files = []
        for (int i = 0; i < n; i++) {
            FilePart file = Mock()
            file.filename() >> 'test'
            files.add(file)
        }
        return files
    }
}
