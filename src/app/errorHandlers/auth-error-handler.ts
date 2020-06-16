import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse) {
    if(environment.generic_error_messages === true){
      this.handleGeneric()
    }else{
      this.handleNonGeneric(error);
    }
  }

  handleGeneric(){
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('toastMessages.error'),
      detail: this.translateService.instant('errors.authErrorHandler.forbidden'),
      life: 5000
    })
  }

  handleNonGeneric(error: HttpErrorResponse){
    if(error.error){
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.error.message, life: 5000});
    }else{
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.message, life: 5000});
    }
  }
}
