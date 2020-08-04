import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'structuresNavFilter'
})
export class StructuresNavFilterPipe implements PipeTransform {

  transform(faculties: any, structureName: any): any {

    if (structureName === "") return faculties;


    return faculties.filter(function(dataItem) {
      if (structureName === "") return true;
      else {
        try {
          return (
            dataItem.title.toUpperCase().indexOf(structureName.toUpperCase()) > -1
          );
        } catch (error) {
        }
      }
    });


  }
}
