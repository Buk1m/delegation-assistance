package com.idemia.ip.office.backend.delegation.assistant.reports.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Currency;
import java.util.List;

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_TIME_FORMAT_STRING;
import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DelegationReportDto extends BaseDto {

    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_TIME_FORMAT_STRING)
    private LocalDateTime startDate;

    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_TIME_FORMAT_STRING)
    private LocalDateTime endDate;

    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_TIME_FORMAT_STRING)
    private LocalDateTime generationDate;

    @JsonProperty("destinationCountry")
    private String countryName;

    private BigDecimal advancePayment;

    private DelegationStatus delegationStatus;

    private String destinationLocation;

    private String delegationObjective;

    private String place;

    private BigDecimal duration;

    private List<FlightReportDto> flights;

    private List<AccommodationReportDto> accommodations;

    private DietReportDto diet;

    private MealsReportDto meals;

    private DiemReturnsDto diemReturns;

    private List<ExpenseReportDto> expenses;

    @JsonProperty("user")
    private UserReportDto delegatedEmployee;

    private BigDecimal totalRepayment;

    private Currency targetCurrency;

    public String getTargetCurrency() {
        return targetCurrency.getCurrencyCode();
    }

    public void setTargetCurrency(String targetCurrency) {
        this.targetCurrency = Currency.getInstance(targetCurrency);
    }
}
