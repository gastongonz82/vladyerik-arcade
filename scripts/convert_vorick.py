import bpy, os
root=os.environ["GITHUB_WORKSPACE"]
base=os.path.join(root,"games","vladi-backrooms","vorick")
src=os.path.join(base,"Vorick the Clown.fbx")
dst=os.path.join(base,"vorick.glb")
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=src,use_image_search=True)
meshes=[o for o in bpy.context.scene.objects if o.type=="MESH"]
if not meshes: raise RuntimeError("FBX contains no meshes")
# Map bundled textures by mesh/material naming and keep them embedded in the GLB.
texture_files={
 "head":"Head Clown texture.png","face":"Head Clown texture.png",
 "clothes":"clothes clown texture.png","body":"clothes clown texture.png",
 "calf":"calf texture.png","leg":"calf texture.png",
 "hand":"hands texture clown.png","shoe":"shoes clown texture.png"
}
for obj in meshes:
 for mat in obj.data.materials:
  if not mat: continue
  key=(mat.name+" "+obj.name).lower()
  filename=next((v for k,v in texture_files.items() if k in key),None)
  if filename:
   mat.use_nodes=True
   bsdf=next((n for n in mat.node_tree.nodes if n.type=="BSDF_PRINCIPLED"),None)
   if bsdf:
    image=mat.node_tree.nodes.new("ShaderNodeTexImage")
    image.image=bpy.data.images.load(os.path.join(base,filename),check_existing=True)
    mat.node_tree.links.new(image.outputs["Color"],bsdf.inputs["Base Color"])
bpy.context.scene.frame_set(1)
# Preserve armature actions and export available FBX animations.
bpy.ops.export_scene.gltf(filepath=dst,export_format="GLB",export_animations=True,export_nla_strips=True,export_force_sampling=True,export_yup=True)
print("EXPORTED",dst,os.path.getsize(dst))
print("ACTIONS",[a.name for a in bpy.data.actions])
