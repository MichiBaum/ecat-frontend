import {MessageService} from "primeng";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class InternalServerErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService, private translateService: TranslateService) {
  }

  matches(error: HttpErrorResponse): boolean {
    return error.status === 500;
  }

  handle(error: HttpErrorResponse) {
    if(error.error){
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.error.message, life: 5000});
    }else{
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.message, life: 5000});
    }
  }

  handleGeneric(){
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('toastMessages.error'),
      detail: this.translateService.instant('errors.internalServerErrorHandler.error'),
      life: 5000
    })
  }
}
