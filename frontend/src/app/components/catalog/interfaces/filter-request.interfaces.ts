export interface ISummerTime {
    min: number;
    max: number;
}

export interface IFrontFender {
    min: number;
    max: number;
}

export interface IPaginationState {
    pageSize: number,
    pageIndex: number
}
export interface ISettingUpIssuance {
    photo: boolean;
    imageSize: any[];
    typeOfIllustrations: any;
    sortBy: any[];
}

export interface IFilterRequest {
    squadIds?: string[];
    countryIds?: string[];
    taxonName?: string;
    frontFenderLength?: IFrontFender;
    colorIds?: string[];
    summerTime?: ISummerTime;
    settingUpIssuance?: ISettingUpIssuance;
    pagination?: IPaginationState,
    sort?: string
}




