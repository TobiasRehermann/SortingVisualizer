import React,{useEffect, useState} from 'react'
import "./SortingVisualizer.css";

export default function SortingVisualizer() {
    var heapsize;
    const[arraySize,setArraySize]=useState(10);
    const[arrayToSort,setArrayToSort]=useState([]);
    const[algorithm,setAlgorithm]=useState("");
    const[animationSpeed,setAnimationSpeed]= useState(60);
    const[animationspeedlabel,setAnimationSpeedLabel]= useState("normal");

    useEffect(()=>{
        setArrayToSort(randomizeArray());
    },[]);

    const pause =(time)=>{
        return new Promise((resolve)=> setTimeout(resolve,time));
    }

    const randomizeArray = ()=>{
        return  Array.from({length:arraySize},()=>Math.floor(Math.random()*400));
      }
    const handleRange = (e)=>{
        setArraySize(e.target.value);
        setArrayToSort(randomizeArray());
    }
    const speedChange = (e)=>{
        switch(e.target.value){
            case "slow":
                setAnimationSpeed(800);
                setAnimationSpeedLabel("slow");
                break;
            case "normal":
                setAnimationSpeed(500);
                setAnimationSpeedLabel("normal");
                break;
            case "fast":
                setAnimationSpeed(200);
                setAnimationSpeedLabel("fast");
                break;
        }

        
    }
    const startAlgorithm=()=>{
        switch(algorithm){
            case "BubbleSort": bubbleSort();
                break;
            case "InsertionSort": InsertionSort();
                break;
            case "HeapSort": HeapSort();
                break;
            case "MergeSort": MergeSort();
                break;
            case "QuickSort": QuickSort();
                break;
            case "RadixSort":RadixSort();
                break;
            default: alert("Please select an algorithm!!!");
                break;
        }

    }
    const changeColor = (algorithm)=>{
        document.getElementById("bubbleSort").style.textDecoration="none";
        document.getElementById("insertionSort").style.textDecoration="none";
        document.getElementById("heapSort").style.textDecoration="none";
        document.getElementById("mergeSort").style.textDecoration="none";
        document.getElementById("quickSort").style.textDecoration="none";
        document.getElementById("radixSort").style.textDecoration="none";
        switch(algorithm){
            case "BubbleSort": document.getElementById("bubbleSort").style.textDecoration="underline";
                break;
            case "InsertionSort":  document.getElementById("insertionSort").style.textDecoration="underline";
                break;
            case "HeapSort": document.getElementById("heapSort").style.textDecoration="underline";
                break;
            case "MergeSort":document.getElementById("mergeSort").style.textDecoration="underline";
                break;
            case "QuickSort": document.getElementById("quickSort").style.textDecoration="underline";
                break;
            case "RadixSort": document.getElementById("radixSort").style.textDecoration="underline";
                break;
        }
        
    }
    //Alogrithms
    //BubbleSort
    async function bubbleSort(){
        let temparray = arrayToSort;
        let length = temparray.length;
        let finished = false;
        do{
            finished = false;
            for(let i = 0; i<length-1;i++){
                let bar1 = document.getElementById(i).style;
                let bar2 = document.getElementById(i+1).style;
                bar1.backgroundColor = "#DC143C";
                bar2.backgroundColor = "#6A5ACD";
                if(temparray[i]>temparray[i+1]){
                    let temp = temparray[i];
                    temparray[i]=temparray[i+1];
                    temparray[i+1]=temp;
                    setArrayToSort([...arrayToSort,temparray]);
                    finished=true;
                }
                await pause(animationSpeed);
                bar1.backgroundColor="#ff00ff";
                bar2.backgroundColor="#ff00ff";
            }
            length=length-1

        }while(finished)
        finishAnimation(animationSpeed)
    }
    //InsertionSort
    async function InsertionSort(){
        let tempArray = arrayToSort;
        for(let i = 1;i<tempArray.length;i++){
            let tempNumber = tempArray[i];
            let bar1 = document.getElementById(i).style;
            bar1.backgroundColor = "#DC143C";
            let j = i;
            while(j>0 &&(tempArray[j-1]>tempNumber)){
                let bar2 = document.getElementById(j).style;
                bar2.backgroundColor = "#DC143C";
                await pause(animationSpeed);
                tempArray[j] = tempArray[j-1];
                j = j - 1;
                bar2.backgroundColor = "#ff00ff";
            }
            let bar2 = document.getElementById(j).style;
            bar2.backgroundColor = "#DC143C";
            bar1.backgroundColor = "#DC143C";
            await pause(animationSpeed);
            tempArray[j]=tempNumber;
            bar1.backgroundColor="#ff00ff";
            bar2.backgroundColor = "#ff00ff";
            setArrayToSort([...arrayToSort,tempArray]);
        }
        finishAnimation(animationSpeed)
    }
    //HeapSort
    async function HeapSort(){
        let tempArray = arrayToSort;
        let length = tempArray.length-1;
        
        heapsize = tempArray.length;
        for(let index = Math.floor(heapsize/2); index>=0;index-=1 ){
            heapify(tempArray,index);
            setArrayToSort([...arrayToSort,tempArray]);
            if(index>=0){
                let bar1 = document.getElementById(index).style;
                let bar2 = document.getElementById(index+1).style;
                bar1.backgroundColor = "#DC143C";
                bar2.backgroundColor = "#6A5ACD";
                
                await pause(animationSpeed);

                bar1.backgroundColor="#ff00ff";
                bar2.backgroundColor="#ff00ff";
            }else{
                await pause(animationSpeed);
            }
        }

       

        for(let index = length;index>0;index--){
            let temp = tempArray[0];
            tempArray[0] = tempArray[index];
            tempArray[index]=temp;
            heapsize = heapsize-1;
            heapify(tempArray,0);
            
            setArrayToSort([...arrayToSort,tempArray]);

            if(index>=0){
                let bar1 = document.getElementById(index).style;
                let bar2 = document.getElementById(0).style;

                bar1.backgroundColor = "#DC143C";
                bar2.backgroundColor = "#6A5ACD";

                await pause(animationSpeed);
                
                bar1.backgroundColor="#ff00ff";
                bar2.backgroundColor="#ff00ff";
            }else{
                await pause(animationSpeed);
            }
            
        }
        finishAnimation(animationSpeed)
    }
    function heapify(array, index){
        let left = 2*index+1
        let right = 2*index+2
        let max = index;
        if(left<heapsize && array[left]>array[max])
            max = left;
        else
            max = index;
        if(right<heapsize && array[right]> array[max])
            max = right;
        if(max !== index){
            let temp = array[index];
            array[index] = array[max];
            array[max]=temp;
            setArrayToSort([...arrayToSort,array]);
    
            heapify(array,max);
        }
    }
    //MergeSort
    //Adapted from The following version By Clement Mihailescu : https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/sortingAlgorithms/sortingAlgorithms.js
    function MergeSort(){
        let tempArray = arrayToSort;
        if(tempArray.length <= 1 )return tempArray;
        const auxiliaryArray = tempArray.slice();
        mergeSortHelper(tempArray,0, tempArray.length-1,auxiliaryArray);
        setArrayToSort([...arrayToSort,tempArray])
        finishAnimation(animationSpeed)
    }
    async function mergeSortHelper(array,startIndex,endIndex,auxiliaryArray){
        if(startIndex === endIndex) return;
        let middleIndex = Math.floor((startIndex + endIndex)/2);
        mergeSortHelper(auxiliaryArray,startIndex,middleIndex,array);
        mergeSortHelper(auxiliaryArray,middleIndex+1,endIndex,array);
        await pause(animationSpeed);
        merge(array,startIndex,middleIndex,endIndex,auxiliaryArray);
    }
    function merge(array,startIndex,middleIndex,endIndex,auxiliaryArray){
        let i = startIndex;
        let j = startIndex;
        let m = middleIndex+1;
        while(i<=middleIndex && m<=endIndex){
            if(auxiliaryArray[i]<=auxiliaryArray[m]){
                array[j++]=auxiliaryArray[i++];
                setArrayToSort([...arrayToSort,array]);
                
                let bar1 = document.getElementById(j).style;
                let bar2 = document.getElementById(i).style;
                bar1.backgroundColor = "#DC143C";
                bar2.backgroundColor = "#6A5ACD";

                setTimeout(()=>{
                    bar1.backgroundColor="#ff00ff";
                    bar2.backgroundColor="#ff00ff";
                },1000);

            }else{
                array[j++] = auxiliaryArray[m++];
                setArrayToSort([...arrayToSort,array]);
                let bar1 = document.getElementById(j).style;
                let bar2 = document.getElementById(i).style;
                bar1.backgroundColor = "#DC143C";
                bar2.backgroundColor = "#6A5ACD";

                setTimeout(()=>{
                    bar1.backgroundColor="#ff00ff";
                    bar2.backgroundColor="#ff00ff";
                },1000);
        
            }
        }
        while(i<=middleIndex){
            array[j++] = auxiliaryArray[i++];
            setArrayToSort([...arrayToSort,array])
        }
        while(m<=endIndex){
            array[j++] = auxiliaryArray[m++];
            setArrayToSort([...arrayToSort,array])
        }
    }
    //QuickSort
    function QuickSort(){
        let tempArray = arrayToSort;
        quickSortHelper(tempArray,0,tempArray.length-1)
    }
    async function quickSortHelper(array,left,right){
        if(left < right){
            let partitionIndex = partition(array,left,right);
            setArrayToSort([...arrayToSort,array]);
            await pause(animationSpeed+100);
            quickSortHelper(array,left,partitionIndex-1);
            quickSortHelper(array,partitionIndex+1,right);
        }
    }
   function partition(array,left,right){
        let i = left;
        let j = right;
        let pivot = array[right];
        while(i<j){
            while(i<right && array[i]<pivot){
                i = i+1;
            }
            while(j>left && array[j]>pivot){
                j= j-1;
            }
            if(i<j){
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
               
                let bar1 = document.getElementById(i).style;
                let bar2 = document.getElementById(j).style;
                bar1.backgroundColor = "#DC143C";
                bar2.backgroundColor = "#6A5ACD";

                setTimeout(()=>{
                    bar1.backgroundColor="#ff00ff";
                    bar2.backgroundColor="#ff00ff";
                },400)

                
                 setArrayToSort([...arrayToSort,array]);
            }
        }
        if(array[i]>pivot){
            let temp = array[i];
                array[i] = array[right];
                array[right] = temp;
                let bar1 = document.getElementById(i).style;
                let bar2 = document.getElementById(right).style;
                bar1.backgroundColor = "#DC143C";
                bar2.backgroundColor = "#6A5ACD";

                setTimeout(()=>{
                    bar1.backgroundColor="#ff00ff";
                    bar2.backgroundColor="#ff00ff";
                },400)

        }
        return i;
    }
    //RadiSort
    // Adapted from The following version By  Avatar Pedro Henrique Machado : https://github.com/machadop1407/Sorting-Visualizer/blob/master/src/Visualizer/SortingVisualizer.js
    async function RadixSort(){
        let tempArray = arrayToSort;
        const largestNumber = getMax(tempArray)
       for(let i = 0; i <largestNumber;i++){
           let buckets = Array.from({length:10},()=>[]);

        for(let j = 0; j <tempArray.length;j++){
            buckets[getPosition(tempArray[j],i)].push(tempArray[j]);
            var bar =document.getElementById(i).style;
            bar.backgroundColor = "#6A5ACD";
        }
        await pause(animationSpeed+300);
        let animArr = [];
        for(var c = 0; c<arraySize%10;c++)
            animArr.push(Math.floor(Math.random()*400));
        animArr.forEach((val)=>{
            var bar = document.getElementById(val).style;
            bar.backgroundColor = "#DC143C";
        });
        let animArr2 = [];
        animArr2.forEach((val) => {
            var bar = document.getElementById(val).style;
            bar.backgroundColor = "#6A5ACD";
          });
        
          tempArray = [].concat(...buckets);
        setArrayToSort(tempArray);

       }
       finishAnimation(animationSpeed)
    }
    function getPosition(num, place) {
        var result = Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
        return result;
    }
    function getMax(array) {
        let max = 0;
        for (let num of array) {
          if (max < num.toString().length) {
            max = num.toString().length;
          }
        }
        return max;
    }

    async function finishAnimation(animationSpeed){
        for(let i = 0; i< arraySize;i++){
            let bar = document.getElementById(i).style;
            bar.backgroundColor="green";
            await pause(animationSpeed);
        }
    }
   
    return (
        <div className="SortingVisualizer">
            <div className="NavBar">
                <div className="NavTasks">
                    <div className="createNewArray"onClick={()=>{setArrayToSort(randomizeArray());
                        for(let i = 0; i< arraySize;i++){
                            let bar = document.getElementById(i).style;
                            bar.backgroundColor="#ff00ff";};
                    }}>Create new Array</div>
                    <div>
                        Length of the Array</div>
                    <div><input type="range" min="2" max="125" defaultValue="10" step="1"  onChange={handleRange}/></div>
                    <div className="bubbleSort" id="bubbleSort" onClick={()=>{setAlgorithm("BubbleSort");changeColor("BubbleSort");}}>Bubble Sort</div>
                    <div className="insertionSort" id="insertionSort" onClick={()=>{setAlgorithm("InsertionSort");changeColor("InsertionSort");}}>Insertion Sort</div>
                    <div className="heapSort" id="heapSort" onClick={()=>{setAlgorithm("HeapSort");changeColor("HeapSort");}}>Heap Sort</div>
                    <div className="mergeSort" id="mergeSort" onClick={()=>{setAlgorithm("MergeSort");changeColor("MergeSort");}}>Merge Sort</div>
                    <div className="quickSort" id="quickSort" onClick={()=>{setAlgorithm("QuickSort");changeColor("QuickSort");}}>Quick Sort</div>
                    <div className="radixSort" id="radixSort" onClick={()=>{setAlgorithm("RadixSort");changeColor("RadixSort");}}>Radix Sort</div>
                    <select className="speedChange" value={animationspeedlabel} onChange={speedChange}>
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                    </select>
                    <div className="restart" onClick={()=>window.location.reload()}>Restart</div>
                    <div className="start" onClick={()=>startAlgorithm()}>Start</div>
                </div>
            </div>
            <div className="arrayContainer">
                {arrayToSort && arrayToSort.map((val,key)=>{
                    return(
                        <div
                        className="bar"
                        id={key}
                        key={key}
                        style={{height:val}}></div>
                    );
                })}
            </div>
        </div>
    );
}
