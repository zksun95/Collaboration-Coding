import { Pipe, PipeTransform } from '@angular/core';
import { File } from '../types/file.type';

@Pipe({
  name: 'searchBox'
})
export class SearchBoxPipe implements PipeTransform {

  transform(files: File[], keyword: string): File[] {
    console.log("searchBox pipe");
    return files.filter(
      file => file.name.toLowerCase().includes(keyword)
    );
    //return files;
  }

}
