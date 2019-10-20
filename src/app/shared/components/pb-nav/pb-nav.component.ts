import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { TokenService } from '../../../token.service';

@Component({
  selector: 'pb-nav',
  templateUrl: './pb-nav.component.html',
  styleUrls: ['./pb-nav.component.css']
})
export class PbNavComponent implements OnInit {

  constructor(private route:ActivatedRoute, private tokenService: TokenService) { 
    const url: Observable<string> = this.route.url.pipe(map(segments => segments.join('')));
  }

  ngOnInit() {
    
  }

  desautenticar(){
    this.tokenService.removeToken();
    console.log("clicou em desautenticar");
  }

}
