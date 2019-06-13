package com.idemia.ip.office.backend.delegation.assistant.delegations.services

import com.idemia.ip.office.backend.delegation.assistant.delegations.strategy.DelegationValidator
import com.idemia.ip.office.backend.delegation.assistant.entities.*
import com.idemia.ip.office.backend.delegation.assistant.security.utils.AuthenticationImpl
import org.springframework.http.codec.multipart.FilePart
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.GrantedAuthority
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import spock.lang.Specification
import spock.lang.Unroll

import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.CREATED
import static com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus.PREPARED
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.*
import static java.time.LocalDateTime.parse

class DelegationServiceCaseSpec extends Specification {

    DelegationValidator delegationFlowValidator = Mock()
    ExternalResourceService externalResourceService = Mock()
    CreateDelegationService createDelegationService = Mock()
    ReadDelegationService readDelegationService = Mock()
    UpdateDelegationService updateDelegationService = Mock()

    DelegationService delegationService = new DelegationServiceImpl(
            delegationFlowValidator,
            externalResourceService,
            createDelegationService,
            readDelegationService,
            updateDelegationService)

    def 'Delegation status and user are correctly assigned'() {
        given: 'User and delegation'
            String userLogin = 'login'
            User user = new User(userLogin)
            Delegation delegation = new Delegation()

        when: 'Delegation is being processed'
            delegationService.addDelegation(delegation, user, 1).block()

        then: 'Delegation has correctly assigned properties'
            1 * externalResourceService.getPreparedChecklist() >> Mono.just(new Checklist())
            1 * externalResourceService.getCountry(1) >> Mono.just(anyCountry())
            1 * createDelegationService.createDelegation(_ as Delegation, _ as Checklist, _ as Country) >> Mono.just(delegation)
            delegation.delegatedEmployee == user
    }

    @Unroll
    def "Searching delegations by user: #login, date since: #since, date until: #until with status: #status, should result in call to repository"() {
        when: 'Calling service'
            List<Delegation> result = delegationService.getDelegations(login, status, since, until).collectList().block()

        then: 'Mock repository response'
            readDelegationService.getDelegations(login, status, since, until) >> Flux.fromIterable([
                    new Delegation()
            ])

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
            null    | null    | null                         | null
            null    | CREATED | null                         | null
            null    | null    | parse('2019-01-01T10:19:19') | null
            null    | null    | null                         | parse('2019-02-01T10:19:19')
            null    | null    | parse('2019-01-01T10:19:19') | parse('2019-02-01T10:19:19')
            null    | CREATED | parse('2019-01-01T10:19:19') | null
            null    | CREATED | null                         | parse('2019-02-01T10:19:19')
            null    | CREATED | parse('2019-01-01T10:19:19') | parse('2019-02-01T10:19:19')
    }

    def 'Service throws exception when status is not validated'() {
        given: 'Delegation with status'
            Delegation existingDelegation = anyDelegation()
            Delegation updateDelegation = getDelegationWithStatus(PREPARED)

        when: 'Service validates new status'
            delegationService.updateDelegation(1, updateDelegation, new AuthenticationImpl('token', '', '', [])).block()

        then: 'Delegation is not validated'
            1 * readDelegationService.getDelegation(_ as Long) >> Mono.just(existingDelegation)
            1 * delegationFlowValidator.validateUserAccess(existingDelegation, _ as AuthenticationImpl) >> true
            1 * delegationFlowValidator.validateDelegationFlow(updateDelegation, _ as Collection<? extends GrantedAuthority>) >> false
            0 * updateDelegationService.statusUpdate(existingDelegation, updateDelegation)
            thrown(AccessDeniedException)
    }

    def 'Service finds delegation, check owner and saves expense'() {
        given: 'Delegation and user'
            Expense expense = new Expense()
            Long delegationId = 1
            Delegation delegation = new Delegation()
            delegation.id = delegationId
            Long userId = 1
            User user = getUser(userId)
            delegation.delegatedEmployee = user

        when: 'Service retrieves delegation, checks with user and saves expenses'
            delegationService.addExpense(expense, userId, delegationId, []).block()

        then: 'Delegation is retrieved checked with user and expenses is saved'
            1 * readDelegationService.getDelegation(delegationId) >> Mono.just(delegation)
            1 * externalResourceService.addExpense(expense, _ as Long, _ as Long, _ as List<FilePart>) >> Mono.just(expense)
            1 * updateDelegationService.addExpense(expense, delegation) >> Mono.just(expense)
    }

    def 'Service finds delegation but user is not an owner'() {
        given: 'Delegation and user'
            Expense expense = new Expense()
            Delegation delegation = new Delegation()
            User owner = getUser(1)
            delegation.delegatedEmployee = owner
            Long delegationId = 1

        when: 'Service retrieves delegation, checks an owner and save expenses'
            delegationService.addExpense(expense, 2, delegationId, []).block()

        then: 'Service throws exception'
            1 * readDelegationService.getDelegation(delegationId) >> Mono.just(delegation)

            thrown(AccessDeniedException)
    }

    def 'Service returns delegation for user which it owns'() {
        given: 'User delegation'
            User user = getUser(1, 'mike')
            Delegation delegation = getUserDelegation(1, user)

        when: 'Get delegation report'
            Delegation report = delegationService.getDelegation(delegation.getId(), user.getLogin()).block()

        then: 'Returns user delegation report'
            1 * readDelegationService.getDelegation(delegation.getId(), user.getLogin()) >> Mono.just(delegation)
            report != null
    }
}
