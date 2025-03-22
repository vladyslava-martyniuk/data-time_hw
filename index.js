document.addEventListener("DOMContentLoaded", () => {
    new CountdownTimer({
      selector: "#timer-1",
      targetDate: new Date("March 23, 2025 23:59:59"),
    });
  });
  
  class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.timerRef = document.querySelector(selector);
      if (!this.timerRef) {
        console.error(`❌ Елемент ${selector} не знайдено!`);
        return;
      }
      
      this.targetDate = targetDate;
      this.refs = {
        days: this.timerRef.querySelector('[data-value="days"]'),
        hours: this.timerRef.querySelector('[data-value="hours"]'),
        mins: this.timerRef.querySelector('[data-value="mins"]'),
        secs: this.timerRef.querySelector('[data-value="secs"]'),
      };
      
      this.start();
    }
  
    start() {
      this.intervalId = setInterval(() => {
        const time = this.targetDate - Date.now();
        if (time <= 0) {
          clearInterval(this.intervalId);
          return;
        }
  
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
  
        this.updateTimer(days, hours, mins, secs);
      }, 1000);
    }
  
    updateTimer(days, hours, mins, secs) {
      if (!this.refs.days || !this.refs.hours || !this.refs.mins || !this.refs.secs) {
        console.error("❌ Один або кілька елементів не знайдено у DOM");
        return;
      }
      this.refs.days.textContent = this.pad(days);
      this.refs.hours.textContent = this.pad(hours);
      this.refs.mins.textContent = this.pad(mins);
      this.refs.secs.textContent = this.pad(secs);
    }
  
    pad(value) {
      return String(value).padStart(2, "0");
    }
  }
  
  // Використання плагіна:
  new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('March 23, 2025 23:59:59'),
  });
  