package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.idemia.ip.office.backend.delegation.assistant.common.BaseDto;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ChecklistDto extends BaseDto {

    private List<ActivityDto> activities;
}
