package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.idemia.ip.office.backend.delegation.assistant.expenses.dtos.ExpenseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DelegationReportDto extends DelegationDto {

    private List<ExpenseDto> expenses = new ArrayList<>();
}
