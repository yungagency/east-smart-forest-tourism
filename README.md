# East Smart Forest & Tourism — plateforme web (phase 1)

Portail de découverte des ressources touristiques de la Région de l'Est (Cameroun), en français et en anglais.
Porteur : Peing Ghislain Junior Walter · Co-portage : Atipik Group · Développement : Yung's Agency.

## Contenu

| Page | URL |
|---|---|
| Accueil (hero, destinations à la une, carte, phases, investir) | `/fr`, `/en` |
| Destinations (filtres + carte + fiches) | `/fr/sites` |
| Fiche destination | `/fr/sites/<slug>` |
| Partenariats et pistes d'investissement | `/fr/opportunites` |
| Visite 3D (satellite + relief) | `/fr/visite-3d` |
| Le projet (vision, 5 piliers, porteurs) | `/fr/a-propos` |
| Contact (formulaire + email / WhatsApp) | `/fr/contact` |
| Crédits photos | `/fr/credits` |
| Mentions légales et confidentialité | `/fr/mentions-legales` |
| Administration | `/admin` |

**Mode démo** : sans variables Supabase, le site affiche les 14 fiches (dont 3 « à documenter ») et 3 pistes intégrées (`lib/seed.js`)
et le formulaire de contact ouvre un email. L'admin s'active dès que Supabase est branché.

Logo : reproduction vectorielle du logo du flyer (`components/Logo.js`, `public/icon.svg`).

Stack : Next.js 15 (App Router, JavaScript), Supabase (base, authentification, stockage photos), Leaflet + OpenStreetMap.

## 1. Mettre en ligne (sans Supabase, 10 minutes)

1. Le code est sur GitHub : `yungagency/east-smart-forest-tourism`.
2. Sur Vercel : **Add New → Project** → importer `east-smart-forest-tourism` → Framework : Next.js → **Deploy**.
3. Le site est en ligne en mode démo.

## 2. Brancher Supabase

1. Dans le projet Supabase dédié : **SQL Editor → New query** → coller `supabase/schema.sql` → **Run**.
2. **Authentication → Users → Add user** : votre email + mot de passe, cocher *Auto confirm*.
3. SQL Editor, exécuter (en remplaçant l'email) :
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'VOTRE_EMAIL';
   ```
4. **Project Settings → API** : copier l'URL du projet et la clé `anon` / publishable.
5. Vercel → projet → **Settings → Environment Variables** :
   - `NEXT_PUBLIC_SUPABASE_URL` = l'URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = la clé
   puis **Deployments → Redeploy**.
6. Aller sur `/admin`, se connecter, cliquer **Importer les fiches de départ** dans *Destinations* puis dans *Opportunités*.

## Contenu : règles

- Toutes les fiches de départ sont marquées **« à vérifier »** : rédigées à partir de sources publiques citées en bas de chaque fiche.
  Passer le statut à `verifie` dans l'admin une fois la fiche validée sur le terrain.
- Coordonnées : position approximative (chef-lieu de commune ou centre du site). La mare de Lala n'a pas encore de position.
- Photos : 7 fiches ont une photo Wikimedia Commons (licence libre, crédit affiché sous la photo et sur `/fr/credits`).
  Les autres affichent un visuel provisoire : ajouter vos photos depuis l'admin, avec le crédit.
- Contacts affichés : `lib/site-config.js` (actuellement ceux du flyer).
