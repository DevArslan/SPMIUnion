import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any, username: any): any {
    if (username === "") return data;


    return data.filter(function(dataItem) {
      if (username === "") return true;
      else {
        try {
          return (
            dataItem.name.toUpperCase().indexOf(username.toUpperCase()) > -1
          );
        } catch (error) {
          console.log("error");
        }
      }
    });


  }




}
