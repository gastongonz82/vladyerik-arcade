import bpy, os
root=os.environ["GITHUB_WORKSPACE"]
base=os.path.join(root,"games","vladi-backrooms","vorick")
src=os.path.join(base,"Vorick the Clown.fbx")
dst=os.path.join(base,"vorick.glb")
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=src, use_image_search=True)
meshes=[o for o in bpy.context.scene.objects if o.type=="MESH"]
if not meshes: raise RuntimeError("FBX contains no meshes")
# Export static rest pose first: FBX action root motion was making the clown invisible.
for o in bpy.context.scene.objects:
    if o.animation_data: o.animation_data_clear()
for o in meshes:
    if o.type=="MESH":
        for p in o.data.polygons: p.use_smooth=True
bpy.context.scene.frame_set(1)
bpy.ops.export_scene.gltf(filepath=dst,export_format="GLB",export_animations=False,export_apply=False,export_yup=True)
print("EXPORTED",dst,os.path.getsize(dst))
