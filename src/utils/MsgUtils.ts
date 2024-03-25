export const getGreetingsMsg = () => {
  let greeting = "";
  let hour = new Date().getHours();
  if (hour < 9) {
    greeting = "早上好";
  } else if (hour < 12) {
    greeting = "上午好";
  } else if (hour < 14) {
    greeting = "中午好";
  } else if (hour < 18) {
    greeting = "下午好";
  } else {
    greeting = "晚上好";
  }
  return greeting;
};
