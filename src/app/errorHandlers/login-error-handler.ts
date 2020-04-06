import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng";
import {Injectable} from "@angular/core";

@Injectable()
export class LoginErrorHandler implements HttpResponseErrorHandler{
  constructor(private messageService: MessageService) {
  }

  matches(error: HttpErrorResponse): boolean {
    if(error.status === 403){
      return true;
    }
    return false;
  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Wrong credentials', life: 5000});
  }
}
