import os
import time
import ifctester
import ifctester.reporter
import ifcopenshell
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import uuid

app = FastAPI()

class Ifc:
    ifc = None
    filepath = None

    @classmethod
    def get(cls, filepath=None):
        if filepath is None or filepath == cls.filepath:
            return cls.ifc
        cls.filepath = filepath
        cls.ifc = ifcopenshell.open(filepath)
        return cls.ifc

@app.get("/")
def index():
    with open("www/index.html") as template:
        return template.read()

@app.get("/test")
def test():
    return {"status":True}

@app.get("/{asset}.{ext}")
def get_asset(asset: str, ext: str):
    if ext in ("js", "css"):
        return FileResponse(f"www/{asset}.{ext}")

@app.post("/audit")
async def audit(ids: UploadFile = File(...), ifc: UploadFile = File(...)):
    filename = ifcopenshell.guid.new()
    ids_filepath = f"uploads/{filename}.ids"
    ifc_filepath = f"uploads/{filename}.ifc"
    with open(ids_filepath, "wb") as f_ids, open(ifc_filepath, "wb") as f_ifc:
        f_ids.write(await ids.read())
        f_ifc.write(await ifc.read())

    start = time.time()
    specs = ifctester.open(ids_filepath)
    ifc = Ifc.get(ifc_filepath)
    print("Finished loading:", time.time() - start)
    start = time.time()
    specs.validate(ifc)
    print("Finished validating:", time.time() - start)
    start = time.time()

    os.remove(ids_filepath)
    os.remove(ifc_filepath)

    engine = ifctester.reporter.Json(specs)
    engine.report()
    return {"data": engine.to_string()}


def transform(data):
    transformed_data = {
        "idsData": {
            "title": data['info']['title'],
            "identifier": str(uuid.uuid4()),
            "copyright": data['info']['copyright'],
            "version": data['info']['version'],
            "description": data['info']['description'],
            "author": data['info']['author'],
            "date": data['info']['date'],
            "purpose": data['info']['purpose'],
            "milestone": None,
            "specifications": []
        }
    }

    for spec in data['specifications']['specification']:
        transformed_spec = {
            "identifier": str(uuid.uuid4()),
            "name": spec['@name'],
            "description": spec.get('@description', ''),
            "instructions": spec.get('@instructions', ''),
            "ifcVersion": spec.get('@ifcVersion', []),
            "necessity": "optional",
            "applicability": {
                "entity": {},
                "partOf": {},
                "classification": {},
                "attribute": {},
                "property": {},
                "material": {}
            },
            "applicableEntities": [],
            "failedEntities": [],
            "requirements": {
                "entity": {},
                "partOf": {},
                "classification": {},
                "attribute": {},
                "property": {},
                "material": {}
            },
            "status": None
        }

        if 'applicability' in spec:
            applicability = spec['applicability']
            if 'entity' in applicability:
                for entity in applicability['entity']:
                    entity_id = str(uuid.uuid4())
                    transformed_entity = {
                        "filterType": "applicability",
                        "identifier": entity_id,
                        "necessity": "required",
                        "name": [entity['name']['simpleValue']],
                        "matchTypeName": "simpleValue",
                        "predefinedType": [],
                        "matchTypePredefinedType": "simpleValue",
                        "instructions": None,
                        "facetType": "entity",
                        "status": None,
                        "failedEntities": [],
                        "failedReasons": []
                    }
                    transformed_spec["applicability"]["entity"][entity_id] = transformed_entity

        if 'requirements' in spec:
            requirements = spec['requirements']
            if 'attribute' in requirements:
                for attribute in requirements['attribute']:
                    attribute_id = str(uuid.uuid4())
                    transformed_attribute = {
                        "filterType": "requirements",
                        "identifier": attribute_id,
                        "necessity": "required",
                        "name": [attribute['name']['simpleValue']],
                        "matchTypeName": "simpleValue",
                        "value": [attribute['value']['simpleValue']],
                        "matchTypeValue": "simpleValue",
                        "instructions": attribute.get('@instructions', ''),
                        "facetType": "attribute",
                        "status": None,
                        "failedEntities": [],
                        "failedReasons": []
                    }
                    transformed_spec["requirements"]["attribute"][attribute_id] = transformed_attribute

            if 'property' in requirements:
                for prop in requirements['property']:
                    prop_id = str(uuid.uuid4())
                    transformed_prop = {
                        "filterType": "requirements",
                        "identifier": prop_id,
                        "necessity": "required",
                        "psetName": [prop['propertySet']['simpleValue']],
                        "matchTypePsetName": "simpleValue",
                        "name": [prop['name']['simpleValue']],
                        "matchTypeName": "simpleValue",
                        "value": [prop['value']['xs:restriction'][0]['xs:pattern'][0]['@value']],
                        "matchTypeValue": "regex",
                        "dataType": prop['@datatype'],
                        "instructions": prop.get('@instructions', ''),
                        "facetType": "property",
                        "status": None,
                        "failedEntities": [],
                        "failedReasons": []
                    }
                    transformed_spec["requirements"]["property"][prop_id] = transformed_prop

        transformed_data["idsData"]["specifications"].append(transformed_spec)

    return transformed_data


@app.post("/loadIds")
async def audit(ids: UploadFile = File(...)):
    filename = ifcopenshell.guid.new()
    ids_filepath = f"uploads/{filename}.ids"
    with open(ids_filepath, "wb") as f_ids:
        f_ids.write(await ids.read())


    ids = ifctester.open(ids_filepath)
    os.remove(ids_filepath)
    # print(ids.asdict())

    return {"data": transform(ids.asdict())}
