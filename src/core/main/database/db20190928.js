var db20190928 = {
  commandsGlobal () {
    return [
      'CREATE TABLE `projects` (`pid` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,`name` TEXT,`domain` TEXT,`icon` TEXT,`local` INTEGER,`rendering` INTEGER,`concurrency` INTEGER,`automation` INTEGER);',
      'CREATE TABLE "dropcatcher" ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `domain` TEXT, `date` INTEGER, `tld` TEXT )',
      'CREATE UNIQUE INDEX `dropcatcher_domain` ON `dropcatcher` ( `domain` ASC )'
    ]
  },
  commandsProject () {
    return [
      'CREATE TABLE `audit` ( `aid` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `started` INTEGER, `finished` INTEGER, `status` INTEGER, `errors` INTEGER, `warnings` INTEGER, `notifications` INTEGER )',
      'CREATE TABLE `audit_page` ( `path` TEXT, `aid` INTEGER, `errors` INTEGER, `warnings` INTEGER, `notices` INTEGER )',
      'CREATE TABLE "audit_messages" ( `aid` INTEGER, `path` TEXT, `status` INTEGER, `message` BLOB )',
      'CREATE TABLE `audit_category` ( `cid` TEXT NOT NULL UNIQUE, `name` TEXT, `weight` INTEGER )',
      'CREATE TABLE "audit_markup" ( `aid` INTEGER, `path` TEXT UNIQUE, `markup` BLOB, `type` INTEGER )',
      'CREATE INDEX `audit_message_path_aid` ON `audit_messages` ( `aid`, `path` )',
      'CREATE UNIQUE INDEX `path_aid` ON `audit_page` ( `path` ASC, `aid` ASC )',
      'CREATE UNIQUE INDEX `audit_category_cid` ON `audit_category` ( `cid` ASC )',
      'CREATE UNIQUE INDEX `audit_markup_path_type_aid` ON `audit_markup` ( `path` ASC, `type` ASC, `aid` ASC )'
    ]
  }
}

export default db20190928
