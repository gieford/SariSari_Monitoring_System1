import _ from 'lodash'


export const sortAlgorithm = (myarr,sortby,orderdir) => {
  var orderBy = sortby;
  var orderDir = orderdir;//'asc';
  var temp = myarr;
      myarr = _.orderBy(temp, function(item){
        if(isNaN(item[orderBy])){
          return (item[orderBy].toLowerCase());
        }else{
          return item[orderBy]
        }
      },orderDir)

  return myarr
}

var arr;

export const mergeSort = (myUnsortedArray) => {

  arr=myUnsortedArray;
  mergeSortRecur(arr,0,arr.length-1);
  return arr
}

function mergeSortRecur(arr,low,high){
  //console.log(low);
  //console.log(high);
  if(low<high){
    var middle = Math.floor(low+(high-low)/2);
    mergeSortRecur(arr,low,middle);
    mergeSortRecur(arr,middle+1,high);
    merge(arr,low,middle,high);
  }
}

function merge(arr,low,middle,high){
  var i,j,k;
  var n1=middle-low+1;
  var n2=high-middle;

  var L=[];
  var R=[];

  for(i=0;i<n1;i++){
    L[i]=arr[low+i];
  }
  for(i=0;i<n2;i++){
    R[i]=arr[middle+1+i];
  }

  i=0; j=0; k=low;

  while(i<n1 && j<n2){
    if(L[i]<=R[j]){
      arr[k]=L[i];
      i++;
    }else{
      arr[k]=R[j];
      j++;
    }
    k++;
  }

  while(i<n1){
    arr[k]=L[i];
    i++;
    k++;
  }

  while(j<n2){
    arr[k]=R[j];
    j++;
    k++;
  }
}
