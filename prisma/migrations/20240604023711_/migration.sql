-- CreateIndex
CREATE FULLTEXT INDEX `Paket_nama_paket_idx` ON `Paket`(`nama_paket`);

-- CreateIndex
CREATE FULLTEXT INDEX `Tari_nama_tari_asal_tari_idx` ON `Tari`(`nama_tari`, `asal_tari`);

-- CreateIndex
CREATE FULLTEXT INDEX `Workshop_nama_workshop_idx` ON `Workshop`(`nama_workshop`);
