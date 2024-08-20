export interface ApiLoginResponseOkDTO {
    success: boolean;
    status: number;
    data: {
        type: string;
        token: string;
        message: string;
    }
}