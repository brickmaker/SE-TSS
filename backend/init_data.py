import sqlite3

conn = sqlite3.connect('./db.sqlite3')
print("database connect successfully")
c = conn.cursor()
c.execute("INSERT INTO 'main'.'authentication_department' ('name') VALUES ('信息中心')")
conn.commit()
print("data init successfully")
conn.close()