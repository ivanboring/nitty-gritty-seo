var db20190928 = {
  commands_general () {
    return [
      'CREATE TABLE `projects` (`pid` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`name` TEXT,`domain` TEXT,`icon` TEXT,`local` INTEGER,`rendering` INTEGER,`concurrency` INTEGER,`automation` INTEGER);'
    ]
  },
  commands_project () {

  }
}

export default db20190928
