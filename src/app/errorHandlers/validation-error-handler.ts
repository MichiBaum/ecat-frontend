import {MessageService} from "primeng";
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class ValidationErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 400;
  }

  handle(error: HttpErrorResponse) {
    for(const errorMsg of error.error.validationErrors){
      this.translateService.get('errors.' + errorMsg).subscribe(translation => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: translation, life: 5000});
      })
    }
  }


}
