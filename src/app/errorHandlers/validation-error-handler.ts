import {MessageService} from "primeng";
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ValidationErrorHandler {

  constructor(private messageService: MessageService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 400;

  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message, life: 5000});
  }


}
