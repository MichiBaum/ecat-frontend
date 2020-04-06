import {MessageService} from "primeng";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {Injectable} from "@angular/core";

@Injectable()
export class InternalServerErrorHandler implements HttpResponseErrorHandler{
  constructor(private messageService: MessageService) {
  }
  matches(error: HttpErrorResponse): boolean {
    if(error.status === 500){
      return true;
    }
    return false;
  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message, life: 5000});
  }
}
