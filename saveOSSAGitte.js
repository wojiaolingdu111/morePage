/**
 * build成功后的运行逻辑
 */
const { execSync } = require("child_process");

(async function Init() {
  /**
   * 上传git
   */
  function execFun() {
    try {
      execSync("git add .");
      execSync(`git commit -m "${process.argv[2] || '提交'}"`);
      execSync("git push -u origin master");
      execSync("git push -u github github");
      console.log("上传git---完成");
    } catch (e) {
      console.log("上传git---失败");
      console.error(e);
    }
  }

  execFun();
})();
