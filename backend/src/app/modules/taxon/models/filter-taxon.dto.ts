import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

export class SummerTime {
    @ApiProperty({
        description: 'The SummerTime min of the taxon', example: 0
    })
    public min: number;

    @ApiProperty({
        description: 'The SummerTime max of the taxon', example: 0
    })
    public max: number;
}

export class FrontFender {
    @ApiProperty({
        description: 'The FrontFender min of the taxon', example: 0
    })
    public min: number;

    @ApiProperty({
        description: 'The FrontFender max of the taxon', example: 100
    })
    public max: number;
}

export class PaginationState {
    @ApiProperty({
        description: 'The pageSize of the taxon', example: 10
    })
    public pageSize: number;

    @ApiProperty({
        description: 'The pageIndex of the taxon', example: 1
    })
    public pageIndex: number;
}

export class SettingUpIssuance {
    @ApiProperty({
        description: 'The IsPhoto of the taxon', example: true
    })
    public IsPhoto?: boolean;

    @ApiProperty({
        description: 'The imageSize of the taxon', example: 'small'
    })
    public imageSize?: any[];

    @ApiProperty({
        description: 'The typeOfIllustrations of the taxon', example: true
    })
    public typeOfIllustrations: any;

    @ApiProperty({
        description: 'The sortBy of the taxon', example: true
    })
    public sortBy: any[];
}

@ApiExtraModels(SettingUpIssuance, PaginationState, FrontFender, SummerTime)
export class FilterRequest {
    @ApiProperty({
        description: 'The squadIds of the taxon',
        example: [],
        required: false
    })
    public squadIds?: string[];

    @ApiProperty({
        description: 'The countryIds of the taxon',
        example: [],
        required: false
    })
    public countryIds?: string[];

    @ApiProperty({
        description: 'The taxonName of the taxon',
        example: 'name',
        required: false
    })
    public taxonName?: string;

    @ApiProperty({
        description: 'The frontFenderLength of the taxon',
        required: false,
        example: FrontFender,
        type: () => FrontFender,
    })
    public frontFenderLength?: FrontFender;

    @ApiProperty({
        description: 'The colorIds of the taxon', example: [],
        required: false
    })
    public colorIds?: string[];

    @ApiProperty({
        description: 'The summerTime of the taxon',
        required: false,
        example: SummerTime,
        type: () => SummerTime,
    })
    public summerTime?: SummerTime;

    @ApiProperty({
        description: 'The settingUpIssuance of the taxon',
        example: SettingUpIssuance,
        type: () => SettingUpIssuance,
        required: false
    })
    public settingUpIssuance?: SettingUpIssuance;

    @ApiProperty({
        description: 'The pagination State of the taxon',
        example: PaginationState,
        type: () => PaginationState,
        required: false
    })
    public pagination?: PaginationState;

    @ApiProperty({
        description: 'The settingUpIssuance of the taxon', 
        example: 'ASC',
        required: false
    })
    public sort?: string
}