package com.idemia.ip.office.backend.delegation.assistant.delegations

import com.idemia.ip.office.backend.delegation.assistant.utils.DatesValidator
import com.idemia.ip.office.backend.delegation.assistant.utils.ValidateDates
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.*

class DatesValidatorCaseSpec extends Specification {
    @Shared
    DateTimeFormatter formatter = DATE_TIME_FORMAT
    DatesValidator datesValidator = new DatesValidator()

    @Shared
    ValidateDates validateDates = Mock(ValidateDates) {
        start() >> 'start'
        end() >> 'end'
    }
    @Shared
    ValidateDates invalidValidateDatesStart = Mock(ValidateDates) {
        start() >> 'bla'
        end() >> 'end'
    }
    @Shared
    ValidateDates invalidValidateDatesEnd = Mock(ValidateDates) {
        start() >> 'start'
        end() >> 'bla'
    }
    @Shared
    ValidateDates invalidValidateDatesBoth = Mock(ValidateDates) {
        start() >> 'bla'
        end() >> 'bla'
    }

    @Unroll
    def "datesValidator with start #start and end #end should returns #result with specific validator"() {
        when:
            datesValidator.initialize(validator)

        then:
            ObjectWithDates objectUnderTest = new ObjectWithDates(
                    start: start,
                    end: end
            )
            result == datesValidator.isValid(objectUnderTest, null)

        where:
            start                       | end                                      | validator                 | result
            getLocalDateTime() | getLocalDateTimePlusYears(formatter, 1)  | validateDates             | true
            getLocalDateTime() | getLocalDateTimeMinusYears(formatter, 1) | validateDates             | false
            null                        | null                                     | validateDates             | false
            null                        | getLocalDateTime(formatter)              | validateDates             | false
            getLocalDateTime() | null                                     | validateDates             | false
            getLocalDateTime() | getLocalDateTimePlusYears(formatter, 1)  | invalidValidateDatesStart | false
            getLocalDateTime() | getLocalDateTimePlusYears(formatter, 1)  | invalidValidateDatesEnd   | false
            getLocalDateTime() | getLocalDateTimePlusYears(formatter, 1)  | invalidValidateDatesBoth  | false
    }

    class ObjectWithDates {
        LocalDateTime start
        LocalDateTime end

        public LocalDateTime getStart() {
            return start
        }

        public LocalDateTime getEnd() {
            return end
        }
    }
}
