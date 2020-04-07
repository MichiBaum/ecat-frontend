import {MessageService} from "primeng";
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpResponseErrorHandler} from "./http-response-error-handler";

@Injectable()
export class ValidationErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 400;

  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message, life: 5000});
  }


}
