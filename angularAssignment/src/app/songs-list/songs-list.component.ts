import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Configs } from '../enums/configs';
import { InfoDialog } from '../services/info-dialog.service';

interface Songs {
  id: number;
  name: string;
  decription: string;
  videoId: string;
}

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent implements OnInit {
  songsList: Songs[];
  displayedColumns: string[] = ['id', 'name', 'decription', 'action'];
  constructor(
    private router: Router,
    private http: HttpClient,
    private infoDialog: InfoDialog
  ) {}

  getSongList = async () => {
    this.songsList = await this.http
      .get<Songs[]>(Configs.getSongs)
      .toPromise()
      .then((data) => data)
      .catch((err) => {
        this.infoDialog.display('Info', 'Internal Server Error');
        return [];
      });
    console.log(this.songsList);
  }

  async ngOnInit() {
    await this.getSongList();
  }

  play = (element) => {
    this.router.navigate(['video-player', element.videoId]);
  }
}
