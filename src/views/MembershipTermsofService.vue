<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="CourseContentBox">
                    <div class="PagesTitle">{{ $t('Serve1') }}</div>
                    <iframe frameborder="0" style="width: 100%; height:600px;"
                        :src="`https://demo18.e-giant.com.tw/Terms/${$cookies.get('Lang')}_UserClauseWeb.asp`">
                    </iframe>
                </div>
            </div>
        </main>
    </div>
</template>
