import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router"
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-song-player',
  templateUrl: './song-player.component.html',
  styleUrls: ['./song-player.component.css']
})
export class SongPlayerComponent implements OnInit {

  snapshot:ActivatedRouteSnapshot
  link:string
  constructor(
    private route:ActivatedRoute,
    private sanitizer:DomSanitizer
  ) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.link=`https://www.youtube.com/embed/${data.id}`
    })
  }
  videoLink=()=>{
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link)
  }

}
