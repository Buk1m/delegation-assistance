package com.idemia.ip.office.backend.delegation.assistant.expenses.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.idemia.ip.office.backend.delegation.assistant.entities.enums.PaymentType;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.FileDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.codec.multipart.FilePart;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDto extends BaseDto {

    @Null(message = "{error.message.field.blank}")
    private Long id;

    @Positive(message = "{error.message.positive}")
    @NotNull(message = "{error.message.not.null}")
    private BigDecimal expenseValue;

    @NotBlank(message = "{error.message.field.not.blank}")
    private String expenseName;

    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "{error.message.not.null}")
    private LocalDate expenseDate;

    @NotNull(message = "{error.message.not.null}")
    private PaymentType paymentType;

    private BigDecimal exchangeRate;

    @NotBlank(message = "{error.message.field.not.blank}")
    @Size(min = 3, max = 3, message = "{error.message.size}")
    private String expenseCurrency;

    @NotEmpty(message = "{error.message.not.empty.files}")
    @JsonInclude(NON_NULL)
    private List<FilePart> attachments;

    @Null(message = "{error.message.field.blank}")
    private List<FileDto> files;
}
