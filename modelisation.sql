# abonne
+-----------+-----------+
| id_abonne | prenom    | 
+-----------+-----------+
|         1 | Guillaume |
|         2 | Benoit    |
|         3 | Chloe     |
|         4 | Laura     |
+-----------+-----------+

# emprunt
+------------+----------+-----------+-------------+------------+
| id_emprunt | id_livre | id_abonne | date_sortie | date_rendu |
+------------+----------+-----------+-------------+------------+
|          1 |      100 |         1 | 2016-12-07  | 2016-12-11 |
|          2 |      101 |         2 | 2016-12-07  | 2016-12-18 |
|          3 |      100 |         3 | 2016-12-11  | 2016-12-19 |
|          4 |      103 |         4 | 2016-12-12  | 2016-12-22 |
|          5 |      104 |         1 | 2016-12-15  | 2016-12-30 |
|          6 |      105 |         2 | 2016-01-02  | 2016-01-15 |
|          7 |      105 |         3 | 2016-02-15  | NULL       |
|          8 |      100 |         2 | 2016-02-20  | NULL       |
+------------+----------+-----------+-------------+------------+

# Livre
+----------+-------------------+-------------------------+
| id_livre | auteur            | titre                   |
+----------+-------------------+-------------------------+
|      100 | GUY DE MAUPASSANT | Une vie                 |
|      101 | GUY DE MAUPASSANT | Bel-Ami                 |
|      102 | HONORE DE BALZAC  | Le pére Gariot          |
|      103 | ALPHONSE DAUDET   | Le Petit chose          |
|      104 | ALPHONSE DUMAS    | La Reine Margot         |
|      105 | ALPHONSE DUMAS    | Les Trois Mousquetaires |
+----------+-------------------+-------------------------+


SELECT "abonne",  WHERE "date_sortie" = "2016-12-11";



SELECT "prenom"
FROM "Abonnes"
JOIN "Emprunt" USING ("id_abonne")
WHERE "date_sortie" = "2016-12-11";

CLIENT
SERVER
SERVER APPELLE CONTROLLER
CONTROLLER APPELLE MODEL (règles de sécurité)
CONTROLLER RENVOIE LA REPONSE AU CLIENT