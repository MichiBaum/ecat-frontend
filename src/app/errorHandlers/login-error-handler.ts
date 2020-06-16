import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class LoginErrorHandler implements HttpResponseErrorHandler{
  constructor(private messageService: MessageService, private translateService: TranslateService) {
  }

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('toastMessages.error'),
      detail: this.translateService.instant('errors.loginErrorHandler.wrongCredentials'),
      life: 5000
    });
  }
}
