package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.delegations.configuration.DelegationsExceptionProperties
import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation
import com.idemia.ip.office.backend.delegation.assistant.entities.User
import com.idemia.ip.office.backend.delegation.assistant.exceptions.InvalidParameterException
import reactor.core.scheduler.Scheduler
import reactor.core.scheduler.Schedulers
import spock.lang.Specification
import spock.lang.Unroll
import java.util.concurrent.Executors

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED
import static java.time.LocalDateTime.parse

class DelegationServiceCaseSpec extends Specification {

    Scheduler scheduler = Schedulers.fromExecutor(Executors.newSingleThreadScheduledExecutor())
    DelegationRepository delegationRepository = Mock(DelegationRepository)
    DelegationsExceptionProperties delegationsExceptionProperties = new DelegationsExceptionProperties()
    DelegationService delegationService = new DelegationServiceImpl(scheduler, delegationRepository, delegationsExceptionProperties)

    def 'Delegation status and user are correctly assigned'() {
        given: 'User and delegation'
            String userLogin = 'login'
            User user = new User(userLogin)
            Delegation delegation = new Delegation()

        when: 'Delegation is being processed'
            delegationService.addDelegation(delegation, user).block()

        then: 'Delegation has correctly assigned properties'
            1 * delegationRepository.save(_ as Delegation)
            delegation.delegationStatus == CREATED
            delegation.delegatedEmployee == user
    }

    @Unroll
    def "Searching delegations by user: #login, date since: #since, date until: #until with status: #status, should result in call to repository"() {
        when: 'Calling service'
            List<Delegation> result = delegationService.getDelegations(login, status, since, until).collectList().block()

        then: 'Mock repository response'
            delegationRepository.getDelegations(login, status, since, until) >> [
                    new Delegation()
            ]

        expect: 'List given by service should have size equals to 1'
            result.size() == 1

        where: 'Parameter cases'
            login   | status  | since                        | until
            'login' | null    | null                         | null
            'login' | CREATED | null                         | null
            'login' | null    | parse('2019-01-01T10:19:19') | null
            'login' | null    | null                         | parse('2019-02-01T10:19:19')
            'login' | null    | parse('2019-01-01T10:19:19') | parse('2019-02-01T10:19:19')
            'login' | CREATED | parse('2019-01-01T10:19:19') | null
            'login' | CREATED | null                         | parse('2019-02-01T10:19:19')
            'login' | CREATED | parse('2019-01-01T10:19:19') | parse('2019-02-01T10:19:19')
			null | null    | null                         | null
			null | CREATED | null                         | null
			null | null    | parse('2019-01-01T10:19:19') | null
			null | null    | null                         | parse('2019-02-01T10:19:19')
			null | null    | parse('2019-01-01T10:19:19') | parse('2019-02-01T10:19:19')
			null | CREATED | parse('2019-01-01T10:19:19') | null
			null | CREATED | null                         | parse('2019-02-01T10:19:19')
			null | CREATED | parse('2019-01-01T10:19:19') | parse('2019-02-01T10:19:19')
    }

    @Unroll
    def "Searching delegations by user: #login, date since: #since, date until: #until with status: #status, should throw exception"() {
        when:
            delegationService.getDelegations(login, status, since, until).collectList().block()

        then:
            thrown InvalidParameterException

        where:
            login   | status  | since                        | until
            'login' | null    | parse('2019-03-01T10:19:19') | parse('2019-02-01T10:19:19')
            'login' | CREATED | parse('2019-03-01T10:19:19') | parse('2019-02-01T10:19:19')
			null | null    | parse('2019-03-01T10:19:19') | parse('2019-02-01T10:19:19')
			null | CREATED | parse('2019-03-01T10:19:19') | parse('2019-02-01T10:19:19')
    }
}
