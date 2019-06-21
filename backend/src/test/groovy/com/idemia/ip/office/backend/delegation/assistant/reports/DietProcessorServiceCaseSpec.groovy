package com.idemia.ip.office.backend.delegation.assistant.reports

import com.idemia.ip.office.backend.delegation.assistant.reports.model.*
import com.idemia.ip.office.backend.delegation.assistant.reports.services.DietProcessorService
import com.idemia.ip.office.backend.delegation.assistant.reports.services.DietProcessorServiceImpl
import com.idemia.ip.office.backend.delegation.assistant.reports.services.ExchangeRatesProvider
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDateTime

import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.anyMealsReport
import static com.idemia.ip.office.backend.delegation.assistant.utils.TestDataProvider.getLocalDateTime

class DietProcessorServiceCaseSpec extends Specification {

    ExchangeRatesProvider exchangeRatesProvider = Mock()

    DietProcessorService dietProcessorService = new DietProcessorServiceImpl(exchangeRatesProvider)

    @Unroll
    def 'Should sets string appropriate to percentage values #expectedEntitlements #delegationReport'(DelegationReport delegationReport, Entitlements expectedEntitlements) {
        when: 'User tries to get Entitlements'
            Entitlements resultEntitlements = dietProcessorService.prepareEntitlements(delegationReport).diemReturns.entitlements

        then: 'Entitlements match to expected'
            resultEntitlements.perDiem == expectedEntitlements.perDiem
            resultEntitlements.breakfast == expectedEntitlements.breakfast
            resultEntitlements.lunches == expectedEntitlements.lunches
            resultEntitlements.dinners == expectedEntitlements.dinners
            resultEntitlements.total == expectedEntitlements.total

        where:
            delegationReport                                                                                                                        || expectedEntitlements
            getDelegationReport(getLocalDateTime(), getLocalDateTime().plusDays(2), anyMealsReport())               || getEntitlements('200.00%', '15.00%', '60.00%', '60.00%', '65.00%')
            getDelegationReport(getLocalDateTime(), getLocalDateTime().plusDays(2), anyMealsReport(0, 1, 2))        || getEntitlements('200.00%', '0.00%', '60.00%', '30.00%', '110.00%')
            getDelegationReport(getLocalDateTime(), getLocalDateTime().plusDays(2), anyMealsReport(0, 0, 0))        || getEntitlements('200.00%', '0.00%', '0.00%', '0.00%', '200.00%')
            getDelegationReport(getLocalDateTime(), getLocalDateTime().plusDays(2).plusHours(3), anyMealsReport())  || getEntitlements('233.00%', '15.00%', '60.00%', '60.00%', '98.00%')
            getDelegationReport(getLocalDateTime(), getLocalDateTime().plusDays(2).plusHours(9), anyMealsReport())  || getEntitlements('250.00%', '15.00%', '60.00%', '60.00%', '115.00%')
            getDelegationReport(getLocalDateTime(), getLocalDateTime().plusDays(2).plusHours(12), anyMealsReport()) || getEntitlements('300.00%', '15.00%', '60.00%', '60.00%', '165.00%')
    }

    @Unroll
    def 'Should summarize diet properly'(Allowance allowance, Entitlements entitlements, DietReport diet, DietReport expectedDiet) {
        given: 'Delegation Report'
            DelegationReport delegationReport = new DelegationReport(diemReturns: new DiemReturns(allowance: allowance, entitlements: entitlements),
                    diet: diet)

        when: 'User tries to summarizeDiet'
            DelegationReport resultDelegationReport = dietProcessorService.summarizeDiet(delegationReport)

        then: 'Diet is summarized'
            resultDelegationReport.diemReturns.totalDiems == allowance.basePerDiem * entitlements.totalPercentage
            resultDelegationReport.diet.perDiem == expectedDiet.perDiem
            resultDelegationReport.diet.exchangeAmount == expectedDiet.exchangeAmount

        where:
            allowance                                        | entitlements                                             | diet                                                 || expectedDiet
            new Allowance(basePerDiem: new BigDecimal("40")) | new Entitlements(totalPercentage: new BigDecimal("1.5")) | new DietReport(exchangeRate: new BigDecimal("2"))    || new DietReport(perDiem: new BigDecimal("60"), exchangeAmount: new BigDecimal("120"))
            new Allowance(basePerDiem: new BigDecimal("36")) | new Entitlements(totalPercentage: new BigDecimal("0.8")) | new DietReport(exchangeRate: new BigDecimal("3.21")) || new DietReport(perDiem: new BigDecimal("28.8"), exchangeAmount: new BigDecimal("92.45"))
            new Allowance(basePerDiem: new BigDecimal("40")) | new Entitlements(totalPercentage: new BigDecimal("1.5")) | new DietReport()                                     || new DietReport(perDiem: new BigDecimal("60"), exchangeAmount: new BigDecimal("0"))
    }

    Entitlements getEntitlements(String perDiem, String breakfast, String lunch, String dinner, String total) {
        new Entitlements(perDiem: perDiem, breakfast: breakfast, lunches: lunch, dinners: dinner, total: total)
    }

    DelegationReport getDelegationReport(LocalDateTime startDate, LocalDateTime endDate, MealsReport meals) {
        new DelegationReport(startDate: startDate, endDate: endDate, meals: meals)
    }
}
