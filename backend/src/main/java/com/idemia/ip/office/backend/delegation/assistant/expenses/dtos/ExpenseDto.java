package com.idemia.ip.office.backend.delegation.assistant.expenses.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.codec.multipart.FilePart;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDto {
    @Positive(message = "{error.message.positive}")
    @NotNull(message = "{error.message.not.null}")
    private BigDecimal expenseValue;

    @NotBlank(message = "{error.message.field.not.blank}")
    private String expenseName;

    @NotBlank(message = "{error.message.field.not.blank}")
    @Size(min = 3, max = 3, message = "{error.message.size}")
    private String expenseCurrency;

    @NotEmpty(message = "{error.message.not.empty.files}")
    @NotNull(message = "{error.message.not.null}")
    private List<FilePart> attachments;
}
