import {Injectable} from '@angular/core';

export interface Res {
    type: string;
    name: string;
    size: number;
    progress: number;
    data: { url: string; };
    message: string;
    status: boolean;
}

@Injectable()
export class LoadingService {
    progress: Res;
    loading = false;

    setProgress(progress: Res) {
        this.progress = progress;
    }

    setLoading(value: boolean) {
        setTimeout(() => {
            this.loading = value;
        });
    }
}
