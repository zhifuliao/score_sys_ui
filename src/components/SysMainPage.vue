<template>
    <body>
        <!-- 内容下方矩形 (矩形) -->
        <div id="down_content_rect"></div>
        <!-- 内容上方矩形 (矩形) -->
        <div id="up_content_rect"></div>
        <!-- 内容 (动态面板) 学生成绩查看 -->
        <div class="state" v-if="state == states[0]">
            <div class="date_label">
                <p><span>学年学号:</span></p>
            </div>
            <el-select id="stu_select" v-model="date_chose" @change="selectChanged" placeholder="学年学期">
                <el-option v-for="item in date_options" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <el-table class="tab" v-if="state == states[0]" :data="score_table" border
                :header-cell-style="{ background: '#d9e5fd', color: 'black', fontWeight: 1000 }">
                <el-table-column prop="xnxq" label="学年学期" min-width="15%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="course_id" label="课程代码" min-width="10%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="name" label="课程名称" min-width="10%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="type" label="课程类别" min-width="13%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="credit" label="学分" min-width="7%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="usual_score" label="平时成绩" min-width="12%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="exam_score" label="期末成绩" min-width="12%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="final_score" label="最终" min-width="12%" align="center" :resizable="false">
                </el-table-column>
            </el-table>
        </div>

        <!-- 内容 (动态面板) 教师成绩查看 -->
        <div class="state" v-if="state == states[1]">
            <div class="date_label">
                <p><span>学年学号:</span></p>
            </div>
            <el-select id="teacher_select" v-model="date_chose" @change="selectChanged" placeholder="学年学期">
                <el-option v-for="item in date_options" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <el-table class="tab" :data="score_table" border
                :header-cell-style="{ background: '#d9e5fd', color: 'black', fontWeight: 1000 }">
                <el-table-column prop="xnxq" label="学年学期" min-width="15%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="course_id" label="课程代码" min-width="10%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="name" label="课程名称" min-width="10%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="type" label="课程类别" min-width="13%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="credit" label="学分" min-width="7%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="usual_score" label="平时成绩" min-width="12%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="exam_score" label="期末成绩" min-width="12%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column prop="final_score" label="最终" min-width="12%" align="center" :resizable="false">
                </el-table-column>
                <el-table-column label="操作" min-width="12%" align="center" :resizable="false">
                    <template #default="{ row }">
                        <el-button type="danger" @click="removeRow(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 内容 (动态面板) 教师成绩添加 -->
        <div class="state" v-if="state == states[2]">
            <div class="teacher_text ">
                <p><span>添加成绩:</span></p>
            </div>
            <div class="course_id_label ">
                <p><span>课程ID:</span></p>
            </div>
            <el-input class="course_id_input" v-model="course_id" placeholder="请输入课程ID" clearable></el-input>
            <div class="stu_account_label ">
                <p><span>学生学号:</span></p>
            </div>
            <el-input class="stu_account_input" v-model="stu_account" placeholder="请输入学生学号" clearable></el-input>
            <div class="n_score_label ">
                <p><span>平时成绩:</span></p>
            </div>
            <el-input class="n_score_input" v-model="n_score" placeholder="请输入平时成绩" clearable></el-input>
            <div class="n_per_label ">
                <p><span>平时占比(0.1形式):</span></p>
            </div>
            <el-input class="n_per_input" v-model="n_per" placeholder="请输入平时占比" clearable></el-input>
            <div class="e_score_label ">
                <p><span>期末成绩:</span></p>
            </div>
            <el-input class="e_score_input" v-model="e_score" placeholder="请输入期末成绩" clearable></el-input>
            <div class="e_per_label ">
                <p><span>期末占比(0.1形式):</span></p>
            </div>
            <el-input class="e_per_input" v-model="e_per" placeholder="请输入期末占比" clearable></el-input>
            <el-button id="add_btn" class="t_btn" type="primary" @click="btnScore('post')" round>添加成绩</el-button>
        </div>
        <!-- 内容 (动态面板) 教师成绩更新 -->
        <div class="state" v-if="state == states[3]">
            <div class="teacher_text ">
                <p><span>更新成绩:</span></p>
            </div>
            <div class="course_id_label ">
                <p><span>课程ID:</span></p>
            </div>
            <el-input class="course_id_input" v-model="course_id" placeholder="请输入课程ID" clearable></el-input>
            <div class="stu_account_label ">
                <p><span>学生学号:</span></p>
            </div>
            <el-input class="stu_account_input" v-model="stu_account" placeholder="请输入学生学号" clearable></el-input>
            <div class="n_score_label ">
                <p><span>平时成绩:</span></p>
            </div>
            <el-input class="n_score_input" v-model="n_score" placeholder="请输入平时成绩" clearable></el-input>
            <div class="n_per_label ">
                <p><span>平时占比(0.1形式):</span></p>
            </div>
            <el-input class="n_per_input" v-model="n_per" placeholder="请输入平时占比" clearable></el-input>
            <div class="e_score_label ">
                <p><span>期末成绩:</span></p>
            </div>
            <el-input class="e_score_input" v-model="e_score" placeholder="请输入期末成绩" clearable></el-input>
            <div class="e_per_label ">
                <p><span>期末占比(0.1形式):</span></p>
            </div>
            <el-input class="e_per_input" v-model="e_per" placeholder="请输入期末占比" clearable></el-input>
            <el-button id="update_btn" class="t_btn" type="primary" @click="btnScore('put')" round>更新成绩</el-button>
        </div>
        <!-- 用户栏 -->
        <div id="user_field">
            <!-- 用户矩形 (矩形) -->
            <div id="user_rect"></div>
            <!-- 用户头像 (椭圆) -->
            <img id="user_icon" src="../assets/main_page/user_icon.svg" />
            <!-- 用户名标签 (矩形) -->
            <div id="user_name_label" class="text " v-text="user_name_label_text"></div>
        </div>
        <!-- 菜单 -->
        <div id="menu_field">
            <!-- 菜单矩形 (矩形) -->
            <div id="menu_rect"></div>
            <!-- 系统图标 (椭圆) -->
            <img id="sys_icon" src="../assets/main_page/sys_icon.svg" />
            <!-- 系统名标签 (矩形) -->
            <div id="sys_label" class="text " v-text="'学生管理系统'"></div>
            <!-- 菜单分割线 (线段) -->
            <img id="menu_line" src="../assets/main_page/menu_line.svg" />
            <!-- 菜单树 (树) -->
            <el-tree id="menu_tree" :data="tree_data" @node-click="handleNodeClick"></el-tree>
        </div>
    </body>
</template>

<script>

import axios from 'axios'
import { reactive } from 'vue';

export default {
    data() {
        const removeRow = (row) => {
            var p = { 'account': this.$route.params.account_val, 'course_id': row['course_id'] }
            var ptr = this
            axios.get('http://127.0.0.1:8888/score/update', { params: p })
                .then(function (response) {
                    if (JSON.parse(response.data)["flag"]) {
                        ptr.$notify({
                            title: '删除成功',
                            type: 'success'
                        })
                        score_table.slice(row, 1)
                    } else {
                        ptr.$notify({
                            title: '删除失败',
                            type: 'error'
                        })
                    }
                }).catch(function (error) {
                    console.log(error)
                });
        };
        const score_table = reactive(
            []
        );
        return {
            removeRow,
            state: 'teacher_list',
            states: ['stu', 'teacher_list', 'teacher_add', `teacher_update`],
            date_chose: '2021-01-01',
            date_options: [
                {
                    value: '2021-01-01',
                    label: '2021-2022 上学期'
                },
                {
                    value: '2021-07-01',
                    label: '2021-2022 下学期'
                },
                {
                    value: '2022-01-01',
                    label: '2022-2023 上学期'
                },
                {
                    value: '2022-07-01',
                    label: '2022-2023 下学期'
                }
            ],
            user_name_label_text: `用户名:${this.$route.params.account_val}`,
            tree_data: [{
                label: '教师',
                children: [{
                    label: '成绩列表'
                }, {
                    label: '添加成绩'
                }, {
                    label: '更新成绩'
                }]
            }, {
                label: '学生',
                children: [{
                    label: '查看成绩'
                }]
            }],
            score_table,
            course_id: null,
            stu_account: null,
            n_score: null,
            n_per: null,
            e_score: null,
            e_per: null
        }
    },
    methods: {
        askTable(val) {
            var ptr = this
            this.score_table.length = 0
            var obj = {
                account: this.$route.params.account_val,
                date: val
            }
            console.log(obj)
            axios.get('http://127.0.0.1:8888/score', { params: obj })
                .then(function (response) {
                    var arr = JSON.parse(response.data)
                    for (var i in arr) {
                        var o = {}
                        o['xnxq'] = ptr.date_chose
                        for (var k in arr[i]) {
                            o[k] = arr[i][k]
                        }
                        ptr.score_table.push(o)
                    }
                }).catch(function (error) {
                    console.log(error)
                });
        },
        btnScore(type) {
            var ptr = this
            var n_p = parseFloat(this.n_per)
            var e_p = parseFloat(this.e_per)
            var n_score = parseFloat(this.n_score)
            var e_score = parseFloat(this.e_score)
            if (n_p + e_p != 1) {
                this.$notify({
                    title: '添加失败',
                    message: '平时占比和考试加起来不为1',
                    type: 'error'
                })
                return
            }
            var obj = {
                course_id: parseInt(this.course_id),
                account: this.stu_account,
                usual_score: n_score,
                exam_score: e_score,
                final_score: n_score * n_p + e_score * e_p
            }
            switch (type) {
                case 'post':
                    axios.post('http://127.0.0.1:8888/score', JSON.stringify(obj))
                        .then(function (response) {
                            if (JSON.parse(response.data)["flag"]) {
                                ptr.$notify({
                                    title: '添加成功',
                                    type: 'success'
                                })
                            } else {
                                ptr.$notify({
                                    title: '添加失败',
                                    type: 'error'
                                })
                            }
                        }).catch(function (error) {
                            console.log(error)
                        });
                    break;
                case 'put':
                    axios.post(`http://127.0.0.1:8888/score/update`, JSON.stringify(obj))
                        .then(function (response) {
                            if (JSON.parse(response.data)["flag"]) {
                                ptr.$notify({
                                    title: '更新成功',
                                    type: 'success'
                                })
                            } else {
                                ptr.$notify({
                                    title: '更新失败',
                                    type: 'error'
                                })
                            }
                        }).catch(function (error) {
                            console.log(error)
                        });
                    break;
            }
        },
        selectChanged(val) {
            console.log(val)
            this.askTable(val)
        },
        handleNodeClick(_, v) {
            switch (v.data["label"]) {
                case '成绩列表': // 教师查看成绩
                    this.state = this.states[1]
                    break;
                case '添加成绩': // 教师添加成绩
                    this.state = this.states[2]
                    break;
                case '更新成绩': // 教师更新成绩
                    this.state = this.states[3]
                    break;
                case '查看成绩': // 学生查看成绩
                    this.state = this.states[0]
                    break;
            }
        },
    },
}
</script>

<style>
body {
    background-color: rgba(230, 230, 230, 1);
    position: relative;
    width: 1366px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
}

#down_content_rect {
    position: absolute;
    left: 364px;
    top: 217px;
    width: 995px;
    height: 580px;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border: none;
    border-radius: 8px;
}

#up_content_rect {
    position: absolute;
    left: 366px;
    top: 139px;
    width: 995px;
    height: 78px;
    display: flex;
    background: inherit;
    background-color: rgba(220, 248, 255, 1);
    border: none;
    border-radius: 8px;
}

#user_field {
    position: absolute;
    left: 357px;
    top: 0px;
    width: 1009px;
    height: 131px;
    border: none;
}

#user_rect {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 1009px;
    height: 131px;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border: none;
    border-radius: 8px;
}

#user_icon {
    position: absolute;
    left: 897px;
    top: 15px;
    width: 105px;
    height: 101px;
}

#user_name_label {
    position: absolute;
    left: 659px;
    top: 50px;
    width: 194px;
    height: 32px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 25px;
}

#menu_field {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 357px;
    height: 797px;
    border: none;
}

#menu_rect {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 357px;
    height: 797px;
    background: inherit;
    background-color: rgba(55, 55, 55, 1);
    border: none;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.6980392156862745);
}

#sys_icon {
    position: absolute;
    left: 19px;
    top: 14px;
    width: 96px;
    height: 103px;
}

#sys_label {
    position: absolute;
    left: 136px;
    top: 44px;
    width: 188px;
    height: 43px;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.996078431372549);
}

#menu_line {
    position: absolute;
    left: 0px;
    top: 130px;
    width: 359px;
    height: 5px;
    -webkit-transform: rotate(0.08916236113021798deg);
    -moz-transform: rotate(0.08916236113021798deg);
    -ms-transform: rotate(0.08916236113021798deg);
    transform: rotate(0.08916236113021798deg);
}

#menu_tree {
    position: absolute;
    left: 19px;
    top: 160px;
    width: 126px;
    height: 120px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0);
    color: cornflowerblue
}

.state {
    position: absolute;
    left: 364px;
    top: 139px;
    width: 997px;
    height: 658px;
}

.date_label {
    position: absolute;
    left: 18px;
    top: 0px;
    width: 104px;
    height: 30px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 22px;
}

.el-select {
    position: absolute;
    left: 120px;
    top: 23px;
    width: 104px;
    height: 130px;
}

.el-select .el-input {
    border-color: #409EFF;
    width: 170px;
}

.tab {
    position: absolute;
    left: 0px;
    top: 78px;
    width: 997px;
}

.teacher_text {
    position: absolute;
    left: 16px;
    top: -9px;
    width: 137px;
    height: 29px;
    font-size: 28px;
    background-color: rgba(255, 255, 255, 0);
}

.course_id_label {
    position: absolute;
    left: 15px;
    top: 88px;
    width: 140px;
    height: 41px;
    font-size: 20px;
}

.course_id_input {
    position: absolute;
    left: 123px;
    top: 102px;
    width: 140px;
    height: 41px;
}

.stu_account_label {
    position: absolute;
    left: 15px;
    top: 148px;
    width: 140px;
    height: 41px;
    font-size: 20px;
}

.stu_account_input {
    position: absolute;
    left: 123px;
    top: 162px;
    width: 140px;
    height: 41px;
}

.n_score_label {
    position: absolute;
    left: 15px;
    top: 208px;
    width: 140px;
    height: 41px;
    font-size: 20px;
}

.n_score_input {
    position: absolute;
    left: 123px;
    top: 222px;
    width: 140px;
    height: 41px;
}

.n_per_label {
    position: absolute;
    left: 326px;
    top: 208px;
    width: 240px;
    height: 41px;
    font-size: 20px;
}

.n_per_input {
    position: absolute;
    left: 500px;
    top: 222px;
    width: 140px;
    height: 41px;
}

.e_score_label {
    position: absolute;
    left: 15px;
    top: 268px;
    width: 240px;
    height: 41px;
    font-size: 20px;
}

.e_score_input {
    position: absolute;
    left: 123px;
    top: 282px;
    width: 140px;
    height: 41px;
}

.e_per_label {
    position: absolute;
    left: 326px;
    top: 268px;
    width: 240px;
    height: 41px;
    font-size: 20px;
}

.e_per_input {
    position: absolute;
    left: 500px;
    top: 282px;
    width: 140px;
    height: 41px;
}

.t_btn {
    position: absolute;
    left: 15px;
    top: 342px;
}
</style>