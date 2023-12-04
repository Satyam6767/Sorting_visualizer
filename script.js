let bars = generateBars(25); 

    function generateBars(count) {
      const barContainer = document.getElementById('container');
      barContainer.innerHTML = '';

      const bars = [];
      for (let i = 0; i < count; i++) {
        const height = Math.floor(Math.random() * 300) + 20;
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${height}px`;

        
        const valueElement = document.createElement('div');
        valueElement.className = 'bar-value';
        valueElement.textContent = height;

        bar.appendChild(valueElement);
        barContainer.appendChild(bar);
        bars.push(height);
      }

      return bars;
    }

    function randomizeArray() {
      bars = generateBars(bars.length);
    }

    function changeSize() {
      const newBars = bars.map(height => Math.max(10, height - 10));
      updateBars(newBars);
    }

    function updateBars(newBars) {
      const barContainer = document.getElementById('container');
      const barElements = barContainer.getElementsByClassName('bar');

      for (let i = 0; i < newBars.length; i++) {
        barElements[i].style.height = `${newBars[i]}px`;
        barElements[i].querySelector('.bar-value').textContent = newBars[i];
      }

      bars = newBars;
    }

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function bubbleSort() {
      for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
          if (bars[j] > bars[j + 1]) {
            // Swap bars[j] and bars[j+1]
            const temp = bars[j];
            bars[j] = bars[j + 1];
            bars[j + 1] = temp;

            updateBars([...bars]); 
            await delay(50); 
          }
        }
      }
    }

    async function insertionSort() {
      for (let i = 1; i < bars.length; i++) {
        const key = bars[i];
        let j = i - 1;

        while (j >= 0 && bars[j] > key) {
          bars[j + 1] = bars[j];
          updateBars([...bars]); 
          await delay(50); 
          j--;
        }

        bars[j + 1] = key;
      }
    }

    async function selectionSort() {
      for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < bars.length; j++) {
          if (bars[j] < bars[minIndex]) {
            minIndex = j;
          }
        }

        
        const temp = bars[i];
        bars[i] = bars[minIndex];
        bars[minIndex] = temp;

        updateBars([...bars]); 
        await delay(50);
      }
    }

    async function quickSort() {
      async function partition(low, high) {
        const pivot = bars[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
          if (bars[j] < pivot) {
            i++;


            const temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;

            updateBars([...bars]); 
            await delay(50); 
          }
        }

        const temp = bars[i + 1];
        bars[i + 1] = bars[high];
        bars[high] = temp;

        updateBars([...bars]); 
        await delay(50); 

        return i + 1;
      }

      async function quickSortHelper(low, high) {
        if (low < high) {
          const partitionIndex = await partition(low, high);

          await Promise.all([
            quickSortHelper(low, partitionIndex - 1),
            quickSortHelper(partitionIndex + 1, high)
          ]);
        }
      }

      await quickSortHelper(0, bars.length - 1);
    }

    async function mergeSort() {
      async function merge(low, mid, high) {
        const n1 = mid - low + 1;
        const n2 = high - mid;

        const left = new Array(n1);
        const right = new Array(n2);

        for (let i = 0; i < n1; i++) {
          left[i] = bars[low + i];
        }

        for (let j = 0; j < n2; j++) {
          right[j] = bars[mid + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = low;

        while (i < n1 && j < n2) {
          if (left[i] <= right[j]) {
            bars[k] = left[i];
            i++;
          } else {
            bars[k] = right[j];
            j++;
          }

          updateBars([...bars]);
          await delay(50); 
          k++;
        }

        while (i < n1) {
          bars[k] = left[i];
          updateBars([...bars]); 
          await delay(50); 
          i++;
          k++;
        }

        while (j < n2) {
          bars[k] = right[j];
          updateBars([...bars]);
          await delay(50); 
          j++;
          k++;
        }
      }

      async function mergeSortHelper(low, high) {
        if (low < high) {
          const mid = Math.floor((low + high) / 2);

          await Promise.all([
            mergeSortHelper(low, mid),
            mergeSortHelper(mid + 1, high),
            merge(low, mid, high)
          ]);
        }
      }

      await mergeSortHelper(0, bars.length - 1);
    }

    async function shellSort() {
      const n = bars.length;
      for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
          const temp = bars[i];
          let j = i;

          while (j >= gap && bars[j - gap] > temp) {
            bars[j] = bars[j - gap];
            updateBars([...bars]); 
            await delay(50);
            j -= gap;
          }

          bars[j] = temp;
        }
      }
    }