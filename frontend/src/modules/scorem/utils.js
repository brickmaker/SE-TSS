export function Take(cid,cname,tid,tname, sid,sname, score,test_date) {
  this.cid = cid;
  this.cname = cname;
  this.tid = tid;
  this.tname = tname;
  this.sid = sid;
  this.sname = sname;
  this.score = score;
  this.test_date = test_date;
}

export function newTake(cid,tid, sid, score,test_date) {
  this.cid = cid;
  this.pid = tid;
  this.sid = sid;
  this.score = score;
  this.test_date = test_date;
}

export function Course(cid,cname,test_date){
  this.cid = cid;
  this.cname = cname;
  this.test_date = test_date;
}
