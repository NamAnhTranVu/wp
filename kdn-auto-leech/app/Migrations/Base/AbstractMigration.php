<?php

namespace KDNAutoLeech\Migrations\Base;


use KDNAutoLeech\Services\DatabaseService;

abstract class AbstractMigration {

    /** @var DatabaseService */
    private $dbService;

    /** @var string Version of the database in the site. */
    private $currentDbVersion;

    /**
     * @param DatabaseService $dbService
     */
    public function __construct($dbService) {
        $this->dbService = $dbService;
        $this->currentDbVersion = $dbService->getDbVersion();
    }

    /**
     * Get the target database version. The target database version is the database version for which this migration is
     * intended for. If the value returned in this method is greater than the site's database version, the migration
     * will be applied.
     *
     * @return string
     */
    protected abstract function getTargetDbVersion();

    /**
     * Perform the migration.
     *
     * @return void
     */
    protected abstract function migrate();

    /**
     * Reverse the migration.
     *
     * @return void
     */
    public abstract function reverse();

    /*
     * PUBLIC METHODS
     */

    /**
     * Performs the migration if it should be performed.
     */
    public function maybeMigrate() {
        // If the migration should not be performed, stop.
        if (!$this->shouldPerformMigration()) return;

        // The migration should be performed.

        $clazz = get_called_class();
        error_log("Performing migration: {$clazz}");

        // Perform the migration
        $this->migrate();

        error_log("Migration performed: {$clazz}");
    }

    /**
     * @return boolean True if the migration should be performed.
     */
    public function shouldPerformMigration() {
        return version_compare($this->currentDbVersion, $this->getTargetDbVersion(), '<');
    }

    /*
     * GETTERS
     */

    /**
     * @return DatabaseService
     */
    protected function getDatabaseService() {
        return $this->dbService;
    }

}