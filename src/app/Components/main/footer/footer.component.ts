import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear= new Date().getFullYear();
  Copied : string = '';
    url = document.location.origin
constructor(private toaster:ToastrService){}
  copyToClipboard(item:any) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy',e.preventDefault);
    });
    document.execCommand('copy');
    this.toaster.success('link is copied','',{
      timeOut: 3000
    });
  }
}
