var db20190928 = {
  commandsGlobal () {
    return [
      'CREATE TABLE `projects` (`pid` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`name` TEXT,`domain` TEXT,`icon` TEXT,`local` INTEGER,`rendering` INTEGER,`concurrency` INTEGER,`automation` INTEGER);'
    ]
  },
  commandsProject () {
    return []
  }
}

export default db20190928
