import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  base64ImageToFile(imageBytes, imageType, imageName): File {
    // extract content type and base64 payload from original string
    let b64 = imageBytes

    // decode base64
    let imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    let buffer = new ArrayBuffer(imageContent.length);
    let view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for(let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    let blob = new Blob([buffer], { type: imageType });

    return new File([blob], imageName);
  }


}
