import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToIcons'
})
export class ConvertToIconsPipe implements PipeTransform {

  transform(data: any): any {

    return data.filter(function(dataItem) {

        try {
          if(dataItem.is_student == true && dataItem.active == true){
            return (
              dataItem.is_student = '&#xf29e;',
              dataItem.active = '&#xf058;'
            );
          }else{
            dataItem.is_student = '&&#xf111;'
          }
          
        } catch (error) {
          console.log("error");
        }
      
    });
  }

}
