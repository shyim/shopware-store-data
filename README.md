# Shopware Store Data

I wanted to play with Clickhouse, so I imported all Store extensions to a Clickhouse database to query stuff. It contains from now all extensions which are compatible to Shopware 6.5.3.0.

## Create Schema

Run `clickhouse-client` then following queries

```sql
set allow_experimental_object_type = 1;
create table data (s String) Engine = Memory;
CREATE TABLE json (o JSON) Engine = MergeTree ORDER BY tuple();
```

## Import Data

```bash
cat data/*.json > extensions.ndjson
cat extensions.ndjson | clickhouse-client --query "INSERT INTO data FORMAT JSONAsString"

# transform into JSON
clickhouse-client --query "insert into json  select s from data;"
```

## Query Data

Some example queries, You can open one data set in `data` folder to find out the structure of the data.

### Extensions with most comments

```sql
SELECT
    length(o.comments) AS count,
    o.name
FROM json
GROUP BY
    o.id,
    o.comments,
    o.name
ORDER BY count DESC
LIMIT 5
```

### Extensions with most versions

```sql
SELECT
    length(o.changelog) AS count,
    o.name
FROM json
GROUP BY
    o.id,
    o.changelog,
    o.name
ORDER BY count DESC
LIMIT 5
```

### Extensions offer support

```sql
SELECT
    o.support,
    count(*) as count
FROM json
GROUP BY
    o.support
ORDER BY count DESC
LIMIT 5
```
