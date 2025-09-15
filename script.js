// ดึง element ที่เราจะใช้จากหน้า HTML
const stackArea = document.getElementById('stack-area');
const heapArea = document.getElementById('heap-area');

// ปุ่มควบคุมต่างๆ
const addToStackBtn = document.getElementById('add-to-stack');
const removeFromStackBtn = document.getElementById('remove-from-stack');
const causeStackOverflowBtn = document.getElementById('cause-stack-overflow');
const addToHeapBtn = document.getElementById('add-to-heap');
const causeHeapOverflowBtn = document.getElementById('cause-heap-overflow');
const resetBtn = document.getElementById('reset-all');

// ตั้งค่าเริ่มต้น
let stackCounter = 0;
const STACK_MAX_SIZE = 10; // กำหนดขนาดสูงสุดของ Stack เพื่อจำลอง Overflow
let heapCounter = 0;

// ----- ฟังก์ชันสำหรับ Stack -----

// ฟังก์ชันเพิ่มข้อมูลลง Stack
function pushToStack() {
    if (stackArea.children.length >= STACK_MAX_SIZE) {
        alert("Stack Overflow! ไม่สามารถเพิ่มข้อมูลได้อีกแล้ว");
        // แสดงภาพว่ามันล้นจริงๆ
        const lastItem = stackArea.children[stackArea.children.length - 1];
        if(lastItem) lastItem.classList.add('overflow');
        return;
    }

    stackCounter++;
    const newItem = document.createElement('div');
    newItem.classList.add('memory-block', 'stack-item');
    newItem.innerText = `Data #${stackCounter} (Primitive)`;
    stackArea.appendChild(newItem); // เพิ่มเข้าไป (CSS จะจัดให้อยู่บนสุด)
}

// ฟังก์ชันนำข้อมูลออกจาก Stack
function popFromStack() {
    if (stackArea.children.length > 0) {
        // นำอันบนสุด (ซึ่งก็คือ child ตัวสุดท้าย) ออก
        stackArea.removeChild(stackArea.lastElementChild);
    } else {
        alert("Stack ว่างเปล่า!");
    }
}

// ฟังก์ชันจำลอง Stack Overflow
function simulateStackOverflow() {
    // ใช้ setInterval เพื่อให้เห็นภาพการเพิ่มข้อมูลทีละขั้น
    const interval = setInterval(() => {
        if (stackArea.children.length < STACK_MAX_SIZE) {
            pushToStack();
        } else {
            pushToStack(); // เรียกอีกครั้งเพื่อให้เกิด overflow alert
            clearInterval(interval);
        }
    }, 100); // เพิ่มทุกๆ 0.1 วินาที
}


// ----- ฟังก์ชันสำหรับ Heap -----

// ฟังก์ชันเพิ่มข้อมูลลง Heap
function allocateHeap() {
    heapCounter++;
    const refAddress = `0x${(Math.random() * 0xFFFFF).toString(16).slice(0, 5).toUpperCase()}`;

    // 1. สร้าง Reference บน Stack ก่อน
    const stackRef = document.createElement('div');
    stackRef.classList.add('memory-block', 'stack-item');
    stackRef.innerText = `Ref to Obj #${heapCounter} (@${refAddress})`;
    stackArea.appendChild(stackRef);

    // 2. สร้าง Object จริงๆ บน Heap
    const heapObj = document.createElement('div');
    heapObj.classList.add('memory-block', 'heap-item');
    heapObj.innerText = `Object #${heapCounter} { data: "..." } (@${refAddress})`;
    heapArea.appendChild(heapObj);
}

// ฟังก์ชันจำลอง Heap Overflow
function simulateHeapOverflow() {
    alert("การจำลอง Heap Overflow:\nในชีวิตจริง Heap จะค่อยๆ ใหญ่ขึ้นจนหน่วยความจำของระบบไม่พอ\nในตัวอย่างนี้ เราจะเพิ่ม Object จำนวนมากลงไปเพื่อแสดงให้เห็นว่าพื้นที่ถูกใช้งานไปเยอะมาก");
    for(let i = 0; i < 20; i++) {
        allocateHeap();
    }
    const overflowItem = document.createElement('div');
    overflowItem.classList.add('memory-block', 'overflow');
    overflowItem.innerText = 'HEAP OVERFLOW!';
    heapArea.appendChild(overflowItem);
}


// ----- ฟังก์ชันรีเซ็ต -----
function reset() {
    stackArea.innerHTML = '';
    heapArea.innerHTML = '';
    stackCounter = 0;
    heapCounter = 0;
}


// ----- การเชื่อมต่อปุ่มกับฟังก์ชัน (Event Listeners) -----
addToStackBtn.addEventListener('click', pushToStack);
removeFromStackBtn.addEventListener('click', popFromStack);
causeStackOverflowBtn.addEventListener('click', simulateStackOverflow);
addToHeapBtn.addEventListener('click', allocateHeap);
causeHeapOverflowBtn.addEventListener('click', simulateHeapOverflow);
resetBtn.addEventListener('click', reset);