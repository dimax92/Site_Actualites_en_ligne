DELIMITER $$
CREATE FUNCTION comparaison_mots( valeur VARCHAR(255), valeur_retour VARCHAR(255))
    RETURNS INT
    DETERMINISTIC
    BEGIN
        DECLARE i INT;
        DECLARE valeur_total INT;
        DECLARE resultat_valeur INT;
        DECLARE resultat_valeur_retour INT;

        SET i = 1;
        SET valeur_total = 0;

        WHILE i <= CHAR_LENGTH(valeur) DO
            IF SUBSTRING(valeur, i, 1) = SUBSTRING(valeur_retour, i, 1) THEN
            SET valeur_total = valeur_total+1;
            END iF;
            SET i = i+1;
        END WHILE;

        SET resultat_valeur_retour = valeur_total/CHAR_LENGTH(valeur_retour)*10;
        SET resultat_valeur = valeur_total/CHAR_LENGTH(valeur)*10;

        IF resultat_valeur_retour >= 8 AND resultat_valeur >=8 THEN
        RETURN 1;
        ELSE
        RETURN 0;
        END IF;
    END$$
DELIMITER ;



DELIMITER $$
CREATE FUNCTION filtre_recherche( valeur VARCHAR(255), valeur_retour VARCHAR(255))
    RETURNS INT
    DETERMINISTIC
    BEGIN
        DECLARE i INT;
        DECLARE valeur_concat TEXT;
        DECLARE lettre_valeur TEXT;
        DECLARE ressemblance_mots INT;
        DECLARE nombre_mots INT;

        SET i = 1;
        SET valeur = CONCAT(LOWER(valeur), ' ');
        SET valeur_retour = CONCAT(LOWER(valeur_retour), ' ');
        SET valeur_concat = '';
        SET ressemblance_mots = 0;
        SET nombre_mots = 0;

        WHILE i <= CHAR_LENGTH(valeur) DO
            IF CHAR_LENGTH(valeur_concat) > 0 AND SUBSTRING(valeur, i, 1) = ' ' THEN
                IF comparaison_valeurs(valeur_concat, valeur_retour) = 1 THEN
                SET ressemblance_mots = ressemblance_mots+1;
                END IF;
                SET valeur_concat = '';
                SET nombre_mots = nombre_mots+1;
            ELSE
                IF SUBSTRING(valeur, i, 1) != ' ' THEN
                SET lettre_valeur = SUBSTRING(valeur, i, 1);
                SET valeur_concat = CONCAT(valeur_concat, lettre_valeur);
                END IF;
            END IF;
            SET i = i+1;
        END WHILE;

        RETURN ressemblance_mots\nombre_mots*10;
    END$$
DELIMITER ;



DELIMITER $$
CREATE FUNCTION comparaison_valeurs( valeur VARCHAR(255), valeur_retour VARCHAR(255))
    RETURNS INT
    DETERMINISTIC
    BEGIN
        DECLARE j INT;
        DECLARE valeur_retour_concat TEXT;
        DECLARE lettre_valeur_retour TEXT;
        DECLARE ressemblance_mots INT;

        SET j = 1;
        SET valeur = LOWER(valeur);
        SET valeur_retour = LOWER(valeur_retour);
        SET valeur_retour_concat = '';
        SET ressemblance_mots = 0;

        WHILE j <= CHAR_LENGTH(valeur_retour) DO
            IF CHAR_LENGTH(valeur_retour_concat) > 0 AND SUBSTRING(valeur_retour, j, 1) = ' ' THEN
                IF comparaison_mots(valeur_retour_concat, valeur) = 1 THEN
                SET ressemblance_mots = 1;
                END IF;
                SET valeur_retour_concat = '';
            ELSE
                IF SUBSTRING(valeur_retour, j, 1) != ' ' THEN
                SET lettre_valeur_retour = SUBSTRING(valeur_retour, j, 1);
                SET valeur_retour_concat = CONCAT(valeur_retour_concat, lettre_valeur_retour);
                END IF;
            END IF;
            SET j = j+1;
        END WHILE;

        RETURN ressemblance_mots;
    END$$
DELIMITER ;


DELIMITER $$
CREATE FUNCTION transformation_objet( objet VARCHAR(255))
    RETURNS TEXT
    DETERMINISTIC
    BEGIN
        SET objet = REPLACE(objet,'[','');
        SET objet = REPLACE(objet,']','');
        SET objet = REPLACE(objet,'{','');
        SET objet = REPLACE(objet,'}','');
        SET objet = REPLACE(objet,'"sous_titre":','');
        SET objet = REPLACE(objet,'"paragraphe":','');
        SET objet = REPLACE(objet,',',' ');
        SET objet = REPLACE(objet,'"','');

        RETURN objet;
    END$$
DELIMITER ;