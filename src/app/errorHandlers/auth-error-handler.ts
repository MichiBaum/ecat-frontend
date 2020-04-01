import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng";

export class AuthErrorHandler implements HttpResponseErrorHandler{
  constructor(private messageService: MessageService) {
  }
  matches(error: HttpErrorResponse): boolean {
    if(error.status === 403){
      return true;
    }
    return false;
  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message, life: 5000});
  }
}
